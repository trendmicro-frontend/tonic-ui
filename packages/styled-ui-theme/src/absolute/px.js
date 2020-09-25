import borders from '../foundations/borders';
import borderStyles from '../foundations/borderStyles';
import borderWidths from '../foundations/borderWidths';
import breakpoints from '../foundations/breakpoints';
import colors from '../foundations/colors';
import fonts from '../foundations/fonts';
import fontSizes from '../foundations/fontSizes';
import fontWeights from '../foundations/fontWeights';
import letterSpacings from '../foundations/letterSpacings';
import lineHeights from '../foundations/lineHeights';
import radii from '../foundations/radii';
import shadows from '../foundations/shadows';
import sizes from '../foundations/sizes';
import space from '../foundations/space';
import zIndices from '../foundations/zIndices';

const spaceUnit = 'px';
const spaceDefinition = {
  quarter: {
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    notation: 'q',
    value: 1,
  },
  half: {
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    notation: 'h',
    value: 2,
  },
  whole: {
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 24, 32, 40, 48, 56, 64],
    notation: 'x',
    value: 4,
  },
};

// space for margin and padding
const pxSpace = (() => {
  let accumulatedSpace = {};

  Object.keys(spaceDefinition).forEach(name => {
    const { list, notation, value } = spaceDefinition[name];
    const reducer = (acc, n) => {
      const k = `${n}${notation}`;
      const v = `${(value * n)}${spaceUnit}`.replace(/^0+/, ''); // omitting leading '0's
      acc[k] = v;
      return acc;
    };
    const initialValue = {};

    accumulatedSpace = {
      ...accumulatedSpace,
      ...list.reduce(reducer, initialValue),
    };
  });

  return accumulatedSpace;
})();

const pxFontSizes = {
  xs: '12px',
  sm: '14px',
  md: '16px',
  lg: '18px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '28px',
  '4xl': '32px',
};

const pxLineHeights = {
  normal: 'normal',
  base: '1.5',
  xs: '18px',
  sm: '20px',
  md: '22px',
  lg: '24px',
  xl: '28px',
  '2xl': '32px',
  '3xl': '36px',
  '4xl': '40px',
};

const pxSizes = pxSpace;

const pxRadii = {
  circle: '50%',
  none: 0,
  sm: '3px',
  md: '6px',
  lg: '12px',
};

export default {
  borders,
  borderStyles,
  borderWidths,
  breakpoints,
  colors,
  fonts,
  fontSizes: { ...fontSizes, ...pxFontSizes },
  fontWeights,
  letterSpacings,
  lineHeights: { ...lineHeights, ...pxLineHeights },
  radii: { ...radii, ...pxRadii },
  shadows,
  sizes: { ...sizes, ...pxSizes },
  space: { ...space, ...pxSpace },
  zIndices,
};
