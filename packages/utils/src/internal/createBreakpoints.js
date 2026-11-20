/** @typedef {'xs' | 'sm' | 'md' | 'lg' | 'xl'} Breakpoint */
/** @typedef {{ values?: Partial<Record<Breakpoint, number>>, unit?: string }} BreakpointOptions */

/** @param {BreakpointOptions} [options] */
export function createBreakpoints(options = {}) {
  if (options === null || typeof options !== 'object' || Array.isArray(options)) {
    throw new TypeError('[Tonic UI] breakpoints must be an options object.');
  }

  const { values: input = {}, unit = 'px' } = options;
  const entries = Object.entries(input);
  const keys = /** @type {Breakpoint[]} */ ([]);
  const values = /** @type {Partial<Record<Breakpoint, number>>} */ ({});
  entries.sort(([, a], [, b]) => (a ?? Infinity) - (b ?? Infinity));
  for (const [key, value] of entries) {
    if (key !== 'xs' && key !== 'sm' && key !== 'md' && key !== 'lg' && key !== 'xl') {
      throw new TypeError(`[Tonic UI] Unsupported breakpoint name: ${key}.`);
    }
    if (value === undefined) {
      continue;
    }
    keys.push(key);
    values[key] = value;
  }
  const sortedKeys = Object.freeze(keys);
  const sortedValues = Object.freeze(values);

  /** @param {Breakpoint | number} key */
  function width(key) {
    if (typeof key === 'number') {
      return key;
    }
    if (!Object.prototype.hasOwnProperty.call(values, key)) {
      throw new RangeError(`[Tonic UI] Unknown breakpoint: ${key}.`);
    }
    return values[key];
  }

  /** @param {Breakpoint} key */
  function indexOf(key) {
    const index = keys.indexOf(key);
    if (index < 0) {
      throw new RangeError(`[Tonic UI] Unknown breakpoint: ${key}.`);
    }
    return index;
  }

  /** @param {Breakpoint | number} key */
  const gte = (key) => `@media (width >= ${width(key)}${unit})`;
  /** @param {Breakpoint | number} key */
  const lt = (key) => `@media (width < ${width(key)}${unit})`;
  /** @param {Breakpoint | number} start @param {Breakpoint | number} end */
  const between = (start, end) => `@media (${width(start)}${unit} <= width < ${width(end)}${unit})`;

  /** @param {Breakpoint} key */
  function only(key) {
    const next = keys[indexOf(key) + 1];
    return next ? between(key, next) : gte(key);
  }

  return Object.freeze({ keys: sortedKeys, values: sortedValues, unit, gte, lt, between, only });
}
