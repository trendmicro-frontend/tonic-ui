/** @typedef {'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'} DefaultBreakpoint */
/** @typedef {`${number}${'px' | 'rem' | 'em'}`} QueryLength */
/** @template {string} Name @typedef {Name | QueryLength | 0} QueryBoundary */
/** @template {string} Name @typedef {{ values?: Partial<Record<Name, number>>, unit?: string }} BreakpointOptions */
/**
 * @template {string} [Name=DefaultBreakpoint]
 * @typedef {Readonly<{
 *   keys: readonly Name[],
 *   values: Readonly<Partial<Record<Name, number>>>,
 *   unit: string,
 *   gte: (start: QueryBoundary<Name>) => string,
 *   lt: (end: QueryBoundary<Name>) => string,
 *   between: (start: QueryBoundary<Name>, end: QueryBoundary<Name>) => string,
 *   only: (key: Name) => string,
 * }>} Breakpoints
 */

const queryLengthPattern = /^([0-9]+(?:\.[0-9]+)?|\.[0-9]+)(?:px|rem|em)$/;
const breakpointNamePattern = /^(?:2xl|[A-Za-z][A-Za-z0-9-]*)$/;

/** @template {string} [Name=DefaultBreakpoint] @param {BreakpointOptions<Name>} [options] @returns {Breakpoints<Name>} */
export function createBreakpoints(options = {}) {
  if (options === null || typeof options !== 'object' || Array.isArray(options)) {
    throw new TypeError('[Tonic UI] breakpoints must be an options object.');
  }

  const { values: input = {}, unit = 'px' } = options;
  const entries = Object.entries(input);
  const keys = /** @type {Name[]} */ ([]);
  const values = /** @type {Partial<Record<Name, number>>} */ ({});
  entries.sort(([, a], [, b]) => (a ?? Infinity) - (b ?? Infinity));
  for (const [key, value] of entries) {
    if (!breakpointNamePattern.test(key)) {
      throw new TypeError(`[Tonic UI] Unsupported breakpoint name: ${key}.`);
    }
    if (value === undefined) {
      continue;
    }
    const name = /** @type {Name} */ (key);
    keys.push(name);
    values[name] = value;
  }
  const sortedKeys = Object.freeze(keys);
  const sortedValues = Object.freeze(values);

  /** @param {QueryBoundary<Name>} boundary */
  function resolveBoundary(boundary) {
    if (boundary === 0) {
      return '0';
    }
    if (typeof boundary === 'string') {
      if (Object.prototype.hasOwnProperty.call(values, boundary)) {
        return `${values[/** @type {Name} */ (boundary)]}${unit}`;
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

  /** @param {Name} key */
  function indexOf(key) {
    const index = keys.indexOf(key);
    if (index < 0) {
      throw new RangeError(`[Tonic UI] Unknown breakpoint: ${key}.`);
    }
    return index;
  }

  /** @param {QueryBoundary<Name>} start */
  const gte = (start) => `@media (width >= ${resolveBoundary(start)})`;
  /** @param {QueryBoundary<Name>} end */
  const lt = (end) => `@media (width < ${resolveBoundary(end)})`;
  /** @param {QueryBoundary<Name>} start @param {QueryBoundary<Name>} end */
  const between = (start, end) => `@media (${resolveBoundary(start)} <= width < ${resolveBoundary(end)})`;

  /** @param {Name} key */
  function only(key) {
    if (typeof key !== 'string' || !breakpointNamePattern.test(key)) {
      throw new TypeError('[Tonic UI] Expected a breakpoint name.');
    }
    const next = keys[indexOf(key) + 1];
    return next ? between(key, next) : gte(key);
  }

  return Object.freeze({ keys: sortedKeys, values: sortedValues, unit, gte, lt, between, only });
}
