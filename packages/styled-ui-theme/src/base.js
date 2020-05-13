import icons from './icons';

const breakpoints = [
  '320px',
  '640px',
  '1024px',
  '1280px',
  '1680px',
];
// @media screen and (min-width: 320px)
// @media screen and (min-width: 640px)
// @media screen and (min-width: 1024px)
// @media screen and (min-width: 1280px)
// @media screen and (min-width: 1680px)

// aliases
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];
breakpoints['2xl'] = breakpoints[4];

// space for margin and padding
const space = {
  0: '0',
  '1x': '.25rem', // 4px
  '2x': '.5rem', // 8px
  '3x': '.75rem', // 12px
  '4x': '1rem', // 16px
  '5x': '1.25rem', // 20px
  '6x': '1.5rem', // 24px
  '7x': '1.75rem', // 28px
  '8x': '2rem', // 32px
  '9x': '2.25rem', // 36px
  '10x': '2.5rem', // 40px
  '11x': '2.75rem', // 44px
  '12x': '3rem', // 48px
  '13x': '3.25rem', // 52px
  '14x': '3.5rem', // 56px
  '15x': '3.75rem', // 60px
  '16x': '4rem', // 64px
  '17x': '4.25rem', // 68px
  '18x': '4.5rem', // 72px
  '19x': '4.75rem', // 76px
  '20x': '5rem', // 80px
  '24x': '6rem', // 96px
  '32x': '8rem', // 128px
  '40x': '10rem', // 160px
  '48x': '12rem', // 192px
  '56x': '14rem', // 224px
  '64x': '16rem', // 256px
};

const colors = {
  transparent: 'transparent',
  current: 'currentColor',

  'red:100': '#6e0002',
  'red:90': '#9d0003',
  'red:80': '#b80003',
  'red:70': '#d71920',
  'red:60': '#e52630',
  'red:50': '#f24c4f',
  'red:40': '#f46f71',
  'red:30': '#fd999a',
  'red:20': '#fcc3c4',
  'red:10': '#fee1e2',

  'magenta:100': '#750037',
  'magenta:90': '#960043',
  'magenta:80': '#b3004c',
  'magenta:70': '#ca0455',
  'magenta:60': '#dc1d68',
  'magenta:50': '#e94181',
  'magenta:40': '#f36fa0',
  'magenta:30': '#f9a0c1',
  'magenta:20': '#fcc3d8',
  'magenta:10': '#fee1ec',

  'purple:100': '#460086',
  'purple:90': '#5300a5',
  'purple:80': '#6304ca',
  'purple:70': '#771ddc',
  'purple:60': '#8f41e9',
  'purple:50': '#ab6ff3',
  'purple:40': '#bb89f6',
  'purple:30': '#cca6f9',
  'purple:20': '#ddc3fc',
  'purple:10': '#eee1fe',

  'blue:100': '#002a7e',
  'blue:90': '#00349d',
  'blue:80': '#003db8',
  'blue:70': '#0547cd',
  'blue:60': '#1e5ede',
  'blue:50': '#578aef',
  'blue:40': '#6f9bf4',
  'blue:30': '#95b7fc',
  'blue:20': '#c3d6fc',
  'blue:10': '#e1ebfe',

  'green:100': '#003011',
  'green:90': '#00461a',
  'green:80': '#005c24',
  'green:70': '#00712e',
  'green:60': '#008539',
  'green:50': '#00a94f',
  'green:40': '#04c45a',
  'green:30': '#40e884',
  'green:20': '#89f6b2',
  'green:10': '#c3fcd8',

  'teal:100': '#004034',
  'teal:90': '#005242',
  'teal:80': '#006451',
  'teal:70': '#00755f',
  'teal:60': '#00866c',
  'teal:50': '#00a584',
  'teal:40': '#04caa1',
  'teal:30': '#41e9c5',
  'teal:20': '#89f6df',
  'teal:10': '#c3fcf0',

  'cyan:100': '#003664',
  'cyan:90': '#004575',
  'cyan:80': '#005486',
  'cyan:70': '#006496',
  'cyan:60': '#0075a5',
  'cyan:50': '#0095bf',
  'cyan:40': '#10b4d3',
  'cyan:30': '#41d8e9',
  'cyan:20': '#89f0f6',
  'cyan:10': '#c3f9fc',

  'gray:100': '#151515',
  'gray:90': '#212121',
  'gray:80': '#303030',
  'gray:70': '#424242',
  'gray:60': '#5e5e5e',
  'gray:50': '#8a8a8a',
  'gray:40': '#adadad',
  'gray:30': '#c9c9c9',
  'gray:20': '#e0e0e0',
  'gray:10': '#f2f2f2',

  'orange:50': '#ff7633',

  'yellow:50': '#faba2a',

  'white:emphasis': 'rgba(255, 255, 255, 1.0)',
  'white:primary': 'rgba(255, 255, 255, .92)',
  'white:secondary': 'rgba(255, 255, 255, .60)',
  'white:tertiary': 'rgba(255, 255, 255, .47)',
  'white:disabled': 'rgba(255, 255, 255, .28)',

  'black:emphasis': 'rgba(0, 0, 0, .92)',
  'black:primary': 'rgba(0, 0, 0, .92)',
  'black:secondary': 'rgba(0, 0, 0, .65)',
  'black:tertiary': 'rgba(0, 0, 0, .54)',
  'black:disabled': 'rgba(0, 0, 0, .30)',
};

/**
 * A generic font family should be the last item in the list of font family names:
 * - serif
 * - sans-serif
 * - monospace
 * - cursive
 * - fantasy
 * - system-ui
 * - math
 * - emoji
 * - fangsong
 */
const fonts = {
  heading: '"Segoe UI", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif',
  base: '"Segoe UI", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif',
  mono: '"Segoe UI Mono", "SFMono-Medium", "SF Mono", Menlo, Consolas, Courier, monospace',
};

const fontWeights = {
  thin: 100,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
};

const fontSizes = {
  xs: '.75rem', // font-size: 12px, line-height: 18px
  sm: '.875rem', // font-size: 14px, line-height: 20px
  md: '1rem', // font-size: 16px, line-height: 22px
  lg: '1.125rem', // font-size: 18px, line-height: 24px
  xl: '1.25rem', // font-size: 20px, line-height: 28px
  '2xl': '1.5rem', // font-size: 24px, line-height: 32px
  '3xl': '1.75rem', // font-size: 28px, line-height: 36px
  '4xl': '2rem', // font-size: 32px, line-height: 40px
};

const lineHeights = {
  xs: '1.125rem', // font-size: 12px, line-height: 18px
  sm: '1.25rem', // font-size: 14px, line-height: 20px
  md: '1.375rem', // font-size: 16px, line-height: 22px
  lg: '1.5rem', // font-size: 18px, line-height: 24px
  xl: '1.75rem', // font-size: 20px, line-height: 28px
  '2xl': '2rem', // font-size: 24px, line-height: 32px
  '3xl': '2.25rem', // font-size: 28px, line-height: 36px
  '4xl': '2.5rem', // font-size: 32px, line-height: 40px

  normal: 'normal',
  base: '1.5',
};

const letterSpacings = {
};

const sizes = {
  ...space,
};

const borders = {
  none: 0,
  1: '1px solid',
  2: '2px solid',
};

const borderWidths = {
  none: 0,
  1: '1px',
  2: '2px',
};

const radii = {
  circle: '50%',
  none: 0,
  sm: '3px',
  md: '6px',
  lg: '12px',
};

const shadows = {
  none: 'none',

  /**
   * offset-x | offset-y | blur-radius | spread-radius | color
   */
  dark: {
    sm: '0 2px 8px 0 rgba(0, 0, 0, 0.48), 0 1px 2px 0 rgba(0, 0, 0, 0.16)',
    md: '0 4px 16px 0 rgba(0, 0, 0, 0.48), 0 2px 4px 0 rgba(0, 0, 0, 0.16)',
    lg: '0 8px 32px 0 rgba(0, 0, 0, 0.48), 0 4px 8px 0 rgba(0, 0, 0, 0.16)',
  },
  light: {
    sm: '0 2px 8px 0 rgba(0, 0, 0, 0.16), 0 1px 2px 0 rgba(0, 0, 0, 0.08)',
    md: '0 4px 16px 0 rgba(0, 0, 0, 0.16), 0 2px 4px 0 rgba(0, 0, 0, 0.08)',
    lg: '0 8px 32px 0 rgba(0, 0, 0, 0.16), 0 4px 8px 0 rgba(0, 0, 0, 0.08)',
  },
};

const zIndices = {
  hide: -1,
  auto: 'auto',
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  overlay: 1300,
  drawer: 1400,
  modal: 1500,
  popover: 1600,
  toast: 1700,
  tooltip: 1800,
};

const theme = {
  breakpoints,
  space,
  colors,
  fonts,
  fontWeights,
  fontSizes,
  lineHeights,
  letterSpacings,
  sizes,
  borders,
  borderWidths,
  radii,
  shadows,
  zIndices,
  icons,
};

export default theme;
