import { borders } from './borders';
import { breakpoints } from './breakpoints';
import { colors } from './colors';
import { fonts } from './fonts';
import { fontSizes } from './fontSizes';
import { fontWeights } from './fontWeights';
import { lineHeights } from './lineHeights';
import { outlines } from './outlines';
import { radii } from './radii';
import { sizes } from './sizes';
import { space } from './space';
import { zIndices } from './zIndices';

const createPrimitive = (unit) => {
  return {
    borders: borders[unit],
    breakpoints,
    colors,
    fonts,
    fontSizes: fontSizes[unit],
    fontWeights,
    lineHeights: lineHeights[unit],
    outlines: outlines[unit],
    radii: radii[unit],
    sizes: sizes[unit],
    space: space[unit],
    zIndices,
  };
};

export default createPrimitive;

// Re-export all primitives
export { borders } from './borders';
export { breakpoints } from './breakpoints';
export { colors } from './colors';
export { fonts } from './fonts';
export { fontSizes } from './fontSizes';
export { fontWeights } from './fontWeights';
export { lineHeights } from './lineHeights';
export { outlines } from './outlines';
export { radii } from './radii';
export { sizes } from './sizes';
export { space } from './space';
export { zIndices } from './zIndices';
