export const DEFAULT_INITIAL_FONT_SIZE_PX = 16;

/**
 * Convert a numeric viewport threshold using a 16px initial browser font size.
 * The result is a reference value, not an equivalent media query at every font size.
 *
 * @param {number} width
 * @param {'px' | 'rem'} from
 * @param {'px' | 'rem'} to
 * @returns {number}
 */
export function convertBreakpointWidth(width, from, to) {
  if ((from !== 'px' && from !== 'rem') || (to !== 'px' && to !== 'rem')) {
    throw new RangeError('Breakpoint conversion supports only px and rem.');
  }
  if (from === to) {
    return width;
  }
  return to === 'px' ? width * DEFAULT_INITIAL_FONT_SIZE_PX : width / DEFAULT_INITIAL_FONT_SIZE_PX;
}

export function formatBreakpoint(breakpoints, key, unit = breakpoints.unit) {
  return `${convertBreakpointWidth(breakpoints.values[key], breakpoints.unit, unit)}${unit}`;
}
