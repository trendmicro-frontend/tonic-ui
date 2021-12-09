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

const unitTokens = getUnitTokens('rem');

export default {
  borders: {
    ...borders,
    1: '.0625rem solid',
    2: '.125rem solid',
    3: '.1875rem solid',
    4: '.25rem solid',
    5: '.3125rem solid',
  },
  breakpoints,
  colors,
  fonts,
  fontSizes: {
    ...fontSizes,
    xs: '.75rem',
    sm: '.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.75rem',
    '4xl': '2rem',
  },
  fontWeights,
  letterSpacings,
  lineHeights: {
    ...lineHeights,
    xs: '1.125rem',
    sm: '1.25rem',
    md: '1.375rem',
    lg: '1.5rem',
    xl: '1.75rem',
    '2xl': '2rem',
    '3xl': '2.25rem',
    '4xl': '2.5rem',
  },
  outlines: {
    ...outlines,
    1: '.0625rem solid',
    2: '.125rem solid',
    3: '.1875rem solid',
    4: '.25rem solid',
    5: '.3125rem solid',
  },
  radii: {
    ...radii,
    sm: '.1875rem',
    md: '.375rem',
    lg: '.75rem',
  },
  shadows,
  sizes: { ...sizes, ...unitTokens },
  space: { ...space, ...unitTokens },
  zIndices,
};
