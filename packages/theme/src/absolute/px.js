import borders from '../foundations/borders';
import breakpoints from '../foundations/breakpoints';
import colors from '../foundations/colors';
import fonts from '../foundations/fonts';
import fontSizes from '../foundations/fontSizes';
import fontWeights from '../foundations/fontWeights';
import letterSpacings from '../foundations/letterSpacings';
import lineHeights from '../foundations/lineHeights';
import outlines from '../foundations/outlines';
import radii from '../foundations/radii';
import shadows from '../foundations/shadows';
import sizes from '../foundations/sizes';
import space from '../foundations/space';
import zIndices from '../foundations/zIndices';
import getUnitTokens from '../utils/getUnitTokens';

const unitTokens = getUnitTokens('px');

export default {
  borders,
  breakpoints,
  colors,
  fonts,
  fontSizes: {
    ...fontSizes,
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '28px',
    '4xl': '32px',
  },
  fontWeights,
  letterSpacings,
  lineHeights: {
    ...lineHeights,
    xs: '18px',
    sm: '20px',
    md: '22px',
    lg: '24px',
    xl: '28px',
    '2xl': '32px',
    '3xl': '36px',
    '4xl': '40px',
  },
  outlines,
  radii: {
    ...radii,
    sm: '3px',
    md: '6px',
    lg: '12px',
  },
  shadows,
  sizes: { ...sizes, ...unitTokens },
  space: { ...space, ...unitTokens },
  zIndices,
};
