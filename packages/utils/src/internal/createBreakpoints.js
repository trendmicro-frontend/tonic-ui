/** @typedef {'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'} Breakpoint */
/** @typedef {`${number}${'px' | 'rem' | 'em'}`} QueryLength */
/** @typedef {Breakpoint | QueryLength | 0} QueryBoundary */
/** @typedef {{ values?: Partial<Record<Breakpoint, number>>, unit?: string }} BreakpointOptions */

const queryLengthPattern = /^([0-9]+(?:\.[0-9]+)?|\.[0-9]+)(?:px|rem|em)$/;
const breakpointNamePattern = /^(?:2xl|[A-Za-z][A-Za-z0-9-]*)$/;

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
    if (key !== 'xs' && key !== 'sm' && key !== 'md' && key !== 'lg' && key !== 'xl' && key !== '2xl') {
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

  /** @param {QueryBoundary} boundary */
  function resolveBoundary(boundary) {
    if (boundary === 0) {
      return '0';
    }
    if (typeof boundary === 'string') {
      if (Object.prototype.hasOwnProperty.call(values, boundary)) {
        return `${values[/** @type {Breakpoint} */ (boundary)]}${unit}`;
      }
      const length = queryLengthPattern.exec(boundary);
      if (length && Number.isFinite(Number(length[1]))) {
        return boundary;
      }
      if (breakpointNamePattern.test(boundary)) {
        throw new RangeError(`[Tonic UI] Unknown breakpoint: ${boundary}.`);
      }
    }
    throw new TypeError('[Tonic UI] Expected a breakpoint name, the number 0, or a length with a px, rem, or em unit.');
  }

  /** @param {Breakpoint} key */
  function indexOf(key) {
    const index = keys.indexOf(key);
    if (index < 0) {
      throw new RangeError(`[Tonic UI] Unknown breakpoint: ${key}.`);
    }
    return index;
  }

  /** @param {QueryBoundary} start */
  const gte = (start) => `@media (width >= ${resolveBoundary(start)})`;
  /** @param {QueryBoundary} end */
  const lt = (end) => `@media (width < ${resolveBoundary(end)})`;
  /** @param {QueryBoundary} start @param {QueryBoundary} end */
  const between = (start, end) => `@media (${resolveBoundary(start)} <= width < ${resolveBoundary(end)})`;

  /** @param {Breakpoint} key */
  function only(key) {
    if (typeof key !== 'string' || !breakpointNamePattern.test(key)) {
      throw new TypeError('[Tonic UI] Expected a breakpoint name.');
    }
    const next = keys[indexOf(key) + 1];
    return next ? between(key, next) : gte(key);
  }

  return Object.freeze({ keys: sortedKeys, values: sortedValues, unit, gte, lt, between, only });
}
