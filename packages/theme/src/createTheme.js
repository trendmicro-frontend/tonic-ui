import borders from './foundations/borders';
import breakpoints from './foundations/breakpoints';
import colors from './foundations/colors';
import fonts from './foundations/fonts';
import fontSizes from './foundations/fontSizes';
import fontWeights from './foundations/fontWeights';
import letterSpacings from './foundations/letterSpacings';
import lineHeights from './foundations/lineHeights';
import outlines from './foundations/outlines';
import radii from './foundations/radii';
import shadows from './foundations/shadows';
import sizes from './foundations/sizes';
import space from './foundations/space';
import zIndices from './foundations/zIndices';
import getUnitTokens from './utils/getUnitTokens';

const _rem = (theme) => {
  const unitTokens = getUnitTokens('rem');
  const _theme = { ...theme };

  _theme.borders = {
    ..._theme.borders,
    1: '.0625rem solid',
    2: '.125rem solid',
    3: '.1875rem solid',
    4: '.25rem solid',
    5: '.3125rem solid',
  };

  _theme.fontSizes = {
    ..._theme.fontSizes,
    xs: '.75rem',
    sm: '.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.75rem',
    '4xl': '2rem',
  };

  _theme.lineHeights = {
    ..._theme.lineHeights,
    xs: '1.125rem',
    sm: '1.25rem',
    md: '1.375rem',
    lg: '1.5rem',
    xl: '1.75rem',
    '2xl': '2rem',
    '3xl': '2.25rem',
    '4xl': '2.5rem',
  };

  _theme.outlines = {
    ..._theme.outlines,
    1: '.0625rem solid',
    2: '.125rem solid',
    3: '.1875rem solid',
    4: '.25rem solid',
    5: '.3125rem solid',
  };

  _theme.radii = {
    ..._theme.radii,
    sm: '.1875rem',
    md: '.375rem',
    lg: '.75rem',
  };

  _theme.sizes = {
    ..._theme.sizes,
    ...unitTokens,
  };

  _theme.space = {
    ..._theme.space,
    ...unitTokens,
  };

  return _theme;
};

const _px = (theme) => {
  const unitTokens = getUnitTokens('px');
  const _theme = { ...theme };

  _theme.borders = {
    ..._theme.borders,
    1: '1px solid',
    2: '2px solid',
    3: '3px solid',
    4: '4px solid',
    5: '5px solid',
  };

  _theme.fontSizes = {
    ..._theme.fontSizes,
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '28px',
    '4xl': '32px',
  };

  _theme.lineHeights = {
    ..._theme.lineHeights,
    xs: '18px',
    sm: '20px',
    md: '22px',
    lg: '24px',
    xl: '28px',
    '2xl': '32px',
    '3xl': '36px',
    '4xl': '40px',
  };
  _theme.outlines = {
    ..._theme.outlines,
    1: '1px solid',
    2: '2px solid',
    3: '3px solid',
    4: '4px solid',
    5: '5px solid',
  };
  _theme.radii = {
    ..._theme.radii,
    sm: '3px',
    md: '6px',
    lg: '12px',
  };
  _theme.sizes = {
    ...sizes,
    ...unitTokens,
  };
  _theme.space = {
    ...space,
    ...unitTokens,
  };

  return _theme;
};

const createTheme = (unit) => {
  const foundation = {
    borders,
    breakpoints,
    colors,
    fonts,
    fontSizes,
    fontWeights,
    letterSpacings,
    lineHeights,
    outlines,
    radii,
    shadows,
    sizes,
    space,
    zIndices,
  };

  const theme = {
    'rem': _rem(foundation),
    'px': _px(foundation),
  }[unit] ?? foundation;

  return theme;
};

export default createTheme;
