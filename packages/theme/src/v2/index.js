import borders from './borders';
import breakpoints from './breakpoints';
import colors from './colors';
import fonts from './fonts';
import fontSizes from './fontSizes';
import fontWeights from './fontWeights';
import lineHeights from './lineHeights';
import outlines from './outlines';
import radii from './radii';
import shadows from './shadows';
import sizes from './sizes';
import space from './space';
import zIndices from './zIndices';

const createTheme = (unit) => {
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
    shadows,
    sizes: sizes[unit],
    space: space[unit],
    zIndices,
  };
};

export default createTheme;
