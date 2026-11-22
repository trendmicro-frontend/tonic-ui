import { createBreakpoints, createContainerQueries } from '@tonic-ui/utils/internal';
import { sx } from '@tonic-ui/styled-system/src';

const defaultTheme = {
  borders: {
    1: '.0625rem solid',
    2: '.125rem solid',
    3: '.1875rem solid',
    4: '.25rem solid',
    5: '.3125rem solid',
  },
  breakpoints: createBreakpoints({
    values: { sm: 40, md: 48, lg: 64, xl: 80, '2xl': 96 },
    unit: 'rem',
  }),
  colors: {
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
    'black:emphasis': 'rgba(0, 0, 0, 1.0)',
    'black:primary': 'rgba(0, 0, 0, .92)',
    'black:secondary': 'rgba(0, 0, 0, .65)',
    'black:tertiary': 'rgba(0, 0, 0, .54)',
    'black:disabled': 'rgba(0, 0, 0, .30)',
  },
  fonts: {
    base: '"Segoe UI", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif',
    mono: '"Segoe UI Mono", "SFMono-Medium", "SF Mono", Menlo, Consolas, Courier, monospace',
  },
  fontSizes: {
    xs: '.75rem',
    sm: '.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.75rem',
    '4xl': '2rem',
  },
  fontWeights: {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  lineHeights: {
    normal: 'normal',
    base: '1.5',
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
    1: '.0625rem solid',
    2: '.125rem solid',
    3: '.1875rem solid',
    4: '.25rem solid',
    5: '.3125rem solid',
  },
  radii: {
    circle: '50%',
    none: 0,
    sm: '.1875rem',
    md: '.375rem',
    lg: '.75rem',
  },
  shadows: {
    none: 'none',
  },
  sizes: {
    '1q': '.0625rem',
    '2q': '.125rem',
    '3q': '.1875rem',
    '4q': '.25rem',
    '5q': '.3125rem',
    '6q': '.375rem',
    '7q': '.4375rem',
    '8q': '.5rem',
    '9q': '.5625rem',
    '10q': '.625rem',
    '1h': '.125rem',
    '2h': '.25rem',
    '3h': '.375rem',
    '4h': '.5rem',
    '5h': '.625rem',
    '6h': '.75rem',
    '7h': '.875rem',
    '8h': '1rem',
    '9h': '1.125rem',
    '10h': '1.25rem',
    '1x': '.25rem',
    '2x': '.5rem',
    '3x': '.75rem',
    '4x': '1rem',
    '5x': '1.25rem',
    '6x': '1.5rem',
    '7x': '1.75rem',
    '8x': '2rem',
    '9x': '2.25rem',
    '10x': '2.5rem',
    '11x': '2.75rem',
    '12x': '3rem',
    '13x': '3.25rem',
    '14x': '3.5rem',
    '15x': '3.75rem',
    '16x': '4rem',
    '17x': '4.25rem',
    '18x': '4.5rem',
    '19x': '4.75rem',
    '20x': '5rem',
    '24x': '6rem',
    '32x': '8rem',
    '40x': '10rem',
    '48x': '12rem',
    '56x': '14rem',
    '64x': '16rem',
  },
  space: {
    '1q': '.0625rem',
    '2q': '.125rem',
    '3q': '.1875rem',
    '4q': '.25rem',
    '5q': '.3125rem',
    '6q': '.375rem',
    '7q': '.4375rem',
    '8q': '.5rem',
    '9q': '.5625rem',
    '10q': '.625rem',
    '1h': '.125rem',
    '2h': '.25rem',
    '3h': '.375rem',
    '4h': '.5rem',
    '5h': '.625rem',
    '6h': '.75rem',
    '7h': '.875rem',
    '8h': '1rem',
    '9h': '1.125rem',
    '10h': '1.25rem',
    '1x': '.25rem',
    '2x': '.5rem',
    '3x': '.75rem',
    '4x': '1rem',
    '5x': '1.25rem',
    '6x': '1.5rem',
    '7x': '1.75rem',
    '8x': '2rem',
    '9x': '2.25rem',
    '10x': '2.5rem',
    '11x': '2.75rem',
    '12x': '3rem',
    '13x': '3.25rem',
    '14x': '3.5rem',
    '15x': '3.75rem',
    '16x': '4rem',
    '17x': '4.25rem',
    '18x': '4.5rem',
    '19x': '4.75rem',
    '20x': '5rem',
    '24x': '6rem',
    '32x': '8rem',
    '40x': '10rem',
    '48x': '12rem',
    '56x': '14rem',
    '64x': '16rem',
  },
  zIndices: {
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
  },
};

test('should pass', () => {
  const theme = {
    ...defaultTheme,
    useCSSVariables: true,
    cssVariablePrefix: 'tonic',
    cssVariables: {
      '--tonic-borders-1': '.0625rem solid',
      '--tonic-borders-2': '.125rem solid',
      '--tonic-borders-3': '.1875rem solid',
      '--tonic-borders-4': '.25rem solid',
      '--tonic-borders-5': '.3125rem solid',
      '--tonic-colors-transparent': 'transparent',
      '--tonic-colors-current': 'currentColor',
      '--tonic-colors-red_100': '#6e0002',
      '--tonic-colors-red_90': '#9d0003',
      '--tonic-colors-red_80': '#b80003',
      '--tonic-colors-red_70': '#d71920',
      '--tonic-colors-red_60': '#e52630',
      '--tonic-colors-red_50': '#f24c4f',
      '--tonic-colors-red_40': '#f46f71',
      '--tonic-colors-red_30': '#fd999a',
      '--tonic-colors-red_20': '#fcc3c4',
      '--tonic-colors-red_10': '#fee1e2',
      '--tonic-colors-magenta_100': '#750037',
      '--tonic-colors-magenta_90': '#960043',
      '--tonic-colors-magenta_80': '#b3004c',
      '--tonic-colors-magenta_70': '#ca0455',
      '--tonic-colors-magenta_60': '#dc1d68',
      '--tonic-colors-magenta_50': '#e94181',
      '--tonic-colors-magenta_40': '#f36fa0',
      '--tonic-colors-magenta_30': '#f9a0c1',
      '--tonic-colors-magenta_20': '#fcc3d8',
      '--tonic-colors-magenta_10': '#fee1ec',
      '--tonic-colors-purple_100': '#460086',
      '--tonic-colors-purple_90': '#5300a5',
      '--tonic-colors-purple_80': '#6304ca',
      '--tonic-colors-purple_70': '#771ddc',
      '--tonic-colors-purple_60': '#8f41e9',
      '--tonic-colors-purple_50': '#ab6ff3',
      '--tonic-colors-purple_40': '#bb89f6',
      '--tonic-colors-purple_30': '#cca6f9',
      '--tonic-colors-purple_20': '#ddc3fc',
      '--tonic-colors-purple_10': '#eee1fe',
      '--tonic-colors-blue_100': '#002a7e',
      '--tonic-colors-blue_90': '#00349d',
      '--tonic-colors-blue_80': '#003db8',
      '--tonic-colors-blue_70': '#0547cd',
      '--tonic-colors-blue_60': '#1e5ede',
      '--tonic-colors-blue_50': '#578aef',
      '--tonic-colors-blue_40': '#6f9bf4',
      '--tonic-colors-blue_30': '#95b7fc',
      '--tonic-colors-blue_20': '#c3d6fc',
      '--tonic-colors-blue_10': '#e1ebfe',
      '--tonic-colors-green_100': '#003011',
      '--tonic-colors-green_90': '#00461a',
      '--tonic-colors-green_80': '#005c24',
      '--tonic-colors-green_70': '#00712e',
      '--tonic-colors-green_60': '#008539',
      '--tonic-colors-green_50': '#00a94f',
      '--tonic-colors-green_40': '#04c45a',
      '--tonic-colors-green_30': '#40e884',
      '--tonic-colors-green_20': '#89f6b2',
      '--tonic-colors-green_10': '#c3fcd8',
      '--tonic-colors-teal_100': '#004034',
      '--tonic-colors-teal_90': '#005242',
      '--tonic-colors-teal_80': '#006451',
      '--tonic-colors-teal_70': '#00755f',
      '--tonic-colors-teal_60': '#00866c',
      '--tonic-colors-teal_50': '#00a584',
      '--tonic-colors-teal_40': '#04caa1',
      '--tonic-colors-teal_30': '#41e9c5',
      '--tonic-colors-teal_20': '#89f6df',
      '--tonic-colors-teal_10': '#c3fcf0',
      '--tonic-colors-cyan_100': '#003664',
      '--tonic-colors-cyan_90': '#004575',
      '--tonic-colors-cyan_80': '#005486',
      '--tonic-colors-cyan_70': '#006496',
      '--tonic-colors-cyan_60': '#0075a5',
      '--tonic-colors-cyan_50': '#0095bf',
      '--tonic-colors-cyan_40': '#10b4d3',
      '--tonic-colors-cyan_30': '#41d8e9',
      '--tonic-colors-cyan_20': '#89f0f6',
      '--tonic-colors-cyan_10': '#c3f9fc',
      '--tonic-colors-gray_100': '#151515',
      '--tonic-colors-gray_90': '#212121',
      '--tonic-colors-gray_80': '#303030',
      '--tonic-colors-gray_70': '#424242',
      '--tonic-colors-gray_60': '#5e5e5e',
      '--tonic-colors-gray_50': '#8a8a8a',
      '--tonic-colors-gray_40': '#adadad',
      '--tonic-colors-gray_30': '#c9c9c9',
      '--tonic-colors-gray_20': '#e0e0e0',
      '--tonic-colors-gray_10': '#f2f2f2',
      '--tonic-colors-orange_50': '#ff7633',
      '--tonic-colors-yellow_50': '#faba2a',
      '--tonic-colors-white_emphasis': 'rgba(255, 255, 255, 1.0)',
      '--tonic-colors-white_primary': 'rgba(255, 255, 255, .92)',
      '--tonic-colors-white_secondary': 'rgba(255, 255, 255, .60)',
      '--tonic-colors-white_tertiary': 'rgba(255, 255, 255, .47)',
      '--tonic-colors-white_disabled': 'rgba(255, 255, 255, .28)',
      '--tonic-colors-black_emphasis': 'rgba(0, 0, 0, 1.0)',
      '--tonic-colors-black_primary': 'rgba(0, 0, 0, .92)',
      '--tonic-colors-black_secondary': 'rgba(0, 0, 0, .65)',
      '--tonic-colors-black_tertiary': 'rgba(0, 0, 0, .54)',
      '--tonic-colors-black_disabled': 'rgba(0, 0, 0, .30)',
      '--tonic-fonts-base': '"Segoe UI",-apple-system,BlinkMacSystemFont,"Helvetica Neue",Helvetica,Arial,sans-serif',
      '--tonic-fonts-mono': '"Segoe UI Mono","SFMono-Medium","SF Mono",Menlo,Consolas,Courier,monospace',
      '--tonic-fontSizes-xs': '.75rem',
      '--tonic-fontSizes-sm': '.875rem',
      '--tonic-fontSizes-md': '1rem',
      '--tonic-fontSizes-lg': '1.125rem',
      '--tonic-fontSizes-xl': '1.25rem',
      '--tonic-fontSizes-2xl': '1.5rem',
      '--tonic-fontSizes-3xl': '1.75rem',
      '--tonic-fontSizes-4xl': '2rem',
      '--tonic-fontWeights-thin': '100',
      '--tonic-fontWeights-extralight': '200',
      '--tonic-fontWeights-light': '300',
      '--tonic-fontWeights-normal': '400',
      '--tonic-fontWeights-medium': '500',
      '--tonic-fontWeights-semibold': '600',
      '--tonic-fontWeights-bold': '700',
      '--tonic-fontWeights-extrabold': '800',
      '--tonic-fontWeights-black': '900',
      '--tonic-lineHeights-normal': 'normal',
      '--tonic-lineHeights-base': '1.5',
      '--tonic-lineHeights-xs': '1.125rem',
      '--tonic-lineHeights-sm': '1.25rem',
      '--tonic-lineHeights-md': '1.375rem',
      '--tonic-lineHeights-lg': '1.5rem',
      '--tonic-lineHeights-xl': '1.75rem',
      '--tonic-lineHeights-2xl': '2rem',
      '--tonic-lineHeights-3xl': '2.25rem',
      '--tonic-lineHeights-4xl': '2.5rem',
      '--tonic-outlines-1': '.0625rem solid',
      '--tonic-outlines-2': '.125rem solid',
      '--tonic-outlines-3': '.1875rem solid',
      '--tonic-outlines-4': '.25rem solid',
      '--tonic-outlines-5': '.3125rem solid',
      '--tonic-radii-circle': '50%',
      '--tonic-radii-none': '0',
      '--tonic-radii-sm': '.1875rem',
      '--tonic-radii-md': '.375rem',
      '--tonic-radii-lg': '.75rem',
      '--tonic-shadows-none': 'none',
      '--tonic-sizes-1q': '.0625rem',
      '--tonic-sizes-2q': '.125rem',
      '--tonic-sizes-3q': '.1875rem',
      '--tonic-sizes-4q': '.25rem',
      '--tonic-sizes-5q': '.3125rem',
      '--tonic-sizes-6q': '.375rem',
      '--tonic-sizes-7q': '.4375rem',
      '--tonic-sizes-8q': '.5rem',
      '--tonic-sizes-9q': '.5625rem',
      '--tonic-sizes-10q': '.625rem',
      '--tonic-sizes-1h': '.125rem',
      '--tonic-sizes-2h': '.25rem',
      '--tonic-sizes-3h': '.375rem',
      '--tonic-sizes-4h': '.5rem',
      '--tonic-sizes-5h': '.625rem',
      '--tonic-sizes-6h': '.75rem',
      '--tonic-sizes-7h': '.875rem',
      '--tonic-sizes-8h': '1rem',
      '--tonic-sizes-9h': '1.125rem',
      '--tonic-sizes-10h': '1.25rem',
      '--tonic-sizes-1x': '.25rem',
      '--tonic-sizes-2x': '.5rem',
      '--tonic-sizes-3x': '.75rem',
      '--tonic-sizes-4x': '1rem',
      '--tonic-sizes-5x': '1.25rem',
      '--tonic-sizes-6x': '1.5rem',
      '--tonic-sizes-7x': '1.75rem',
      '--tonic-sizes-8x': '2rem',
      '--tonic-sizes-9x': '2.25rem',
      '--tonic-sizes-10x': '2.5rem',
      '--tonic-sizes-11x': '2.75rem',
      '--tonic-sizes-12x': '3rem',
      '--tonic-sizes-13x': '3.25rem',
      '--tonic-sizes-14x': '3.5rem',
      '--tonic-sizes-15x': '3.75rem',
      '--tonic-sizes-16x': '4rem',
      '--tonic-sizes-17x': '4.25rem',
      '--tonic-sizes-18x': '4.5rem',
      '--tonic-sizes-19x': '4.75rem',
      '--tonic-sizes-20x': '5rem',
      '--tonic-sizes-24x': '6rem',
      '--tonic-sizes-32x': '8rem',
      '--tonic-sizes-40x': '10rem',
      '--tonic-sizes-48x': '12rem',
      '--tonic-sizes-56x': '14rem',
      '--tonic-sizes-64x': '16rem',
      '--tonic-space-1q': '.0625rem',
      '--tonic-space-2q': '.125rem',
      '--tonic-space-3q': '.1875rem',
      '--tonic-space-4q': '.25rem',
      '--tonic-space-5q': '.3125rem',
      '--tonic-space-6q': '.375rem',
      '--tonic-space-7q': '.4375rem',
      '--tonic-space-8q': '.5rem',
      '--tonic-space-9q': '.5625rem',
      '--tonic-space-10q': '.625rem',
      '--tonic-space-1h': '.125rem',
      '--tonic-space-2h': '.25rem',
      '--tonic-space-3h': '.375rem',
      '--tonic-space-4h': '.5rem',
      '--tonic-space-5h': '.625rem',
      '--tonic-space-6h': '.75rem',
      '--tonic-space-7h': '.875rem',
      '--tonic-space-8h': '1rem',
      '--tonic-space-9h': '1.125rem',
      '--tonic-space-10h': '1.25rem',
      '--tonic-space-1x': '.25rem',
      '--tonic-space-2x': '.5rem',
      '--tonic-space-3x': '.75rem',
      '--tonic-space-4x': '1rem',
      '--tonic-space-5x': '1.25rem',
      '--tonic-space-6x': '1.5rem',
      '--tonic-space-7x': '1.75rem',
      '--tonic-space-8x': '2rem',
      '--tonic-space-9x': '2.25rem',
      '--tonic-space-10x': '2.5rem',
      '--tonic-space-11x': '2.75rem',
      '--tonic-space-12x': '3rem',
      '--tonic-space-13x': '3.25rem',
      '--tonic-space-14x': '3.5rem',
      '--tonic-space-15x': '3.75rem',
      '--tonic-space-16x': '4rem',
      '--tonic-space-17x': '4.25rem',
      '--tonic-space-18x': '4.5rem',
      '--tonic-space-19x': '4.75rem',
      '--tonic-space-20x': '5rem',
      '--tonic-space-24x': '6rem',
      '--tonic-space-32x': '8rem',
      '--tonic-space-40x': '10rem',
      '--tonic-space-48x': '12rem',
      '--tonic-space-56x': '14rem',
      '--tonic-space-64x': '16rem',
      '--tonic-zIndices-hide': '-1',
      '--tonic-zIndices-auto': 'auto',
      '--tonic-zIndices-base': '0',
      '--tonic-zIndices-dropdown': '1000',
      '--tonic-zIndices-sticky': '1100',
      '--tonic-zIndices-fixed': '1200',
      '--tonic-zIndices-overlay': '1300',
      '--tonic-zIndices-drawer': '1400',
      '--tonic-zIndices-modal': '1500',
      '--tonic-zIndices-popover': '1600',
      '--tonic-zIndices-toast': '1700',
      '--tonic-zIndices-tooltip': '1800',
    },
  };

  const style = sx({
    as: 'button',
    backgroundColor: 'blue:60',
    border: 'none',
    borderRadius: 'sm',
    color: 'white:primary',
    cursor: 'pointer',
    display: 'inline-flex',
    px: '3x',
    py: '2x',
    _focus: {
      ':not(:active)': { // or '&:focus:not(:active)'
        borderColor: 'blue:60',
        boxShadow: 'inset 0 0 0 var(--tonic-sizes-1q) var(--tonic-colors-blue_60), inset 0 0 0 var(--tonic-sizes-1h) var(--tonic-colors-black_emphasis)',
      },
    },
    _hover: { // or '&:hover'
      backgroundColor: 'blue:50',
    },
    _active: { // or '&:active'
      backgroundColor: 'blue:70',
    },
  })({ theme });

  expect(style).toEqual({
    as: 'button',
    backgroundColor: 'var(--tonic-colors-blue_60)',
    border: 'none',
    borderRadius: 'var(--tonic-radii-sm)',
    color: 'var(--tonic-colors-white_primary)',
    cursor: 'pointer',
    display: 'inline-flex',
    paddingBottom: 'var(--tonic-space-2x)',
    paddingLeft: 'var(--tonic-space-3x)',
    paddingRight: 'var(--tonic-space-3x)',
    paddingTop: 'var(--tonic-space-2x)',
    '&:focus,&[data-focus]': {
      ':not(:active)': {
        borderColor: 'var(--tonic-colors-blue_60)',
        boxShadow: 'inset 0 0 0 var(--tonic-sizes-1q) var(--tonic-colors-blue_60), inset 0 0 0 var(--tonic-sizes-1h) var(--tonic-colors-black_emphasis)',
      },
    },
    '&:hover,&[data-hover]': {
      'backgroundColor': 'var(--tonic-colors-blue_50)',
    },
    '&:active,&[data-active]': {
      backgroundColor: 'var(--tonic-colors-blue_70)',
    },
  });
});

it('keeps authored container rule order and merges matching rules in sx composition', () => {
  const wide = '@container sidebar (width >= 48rem)';
  const narrow = '@container sidebar (width >= 40rem)';
  const base = { [wide]: { width: '50%', color: 'red' }, [narrow]: { width: '75%' } };

  expect(sx(base)({})).toEqual(base);
  expect(Object.keys(sx(base)({}))).toEqual([wide, narrow]);
  expect(sx([base, { [wide]: { width: '25%' } }])({})).toEqual({
    [wide]: { width: '25%', color: 'red' },
    [narrow]: { width: '75%' },
  });
});

describe('responsive values', () => {
  const breakpoints = createBreakpoints({
    values: { sm: 40, md: 48, lg: 64, xl: 80, '2xl': 96 },
    unit: 'rem',
  });
  const theme = { breakpoints };

  it.each([
    [{ width: [] }, 'width'],
    [{ width: ['100%', '50%'] }, 'width'],
    [{ width: () => ['100%', '50%'] }, 'width'],
    [{ customProperty: ['a', 'b'] }, 'customProperty'],
    [{ '&:hover': [null, { color: 'red' }] }, '&:hover'],
    [{ _hover: [null, { color: 'red' }] }, '_hover'],
    [{ _hover: () => [null, { color: 'red' }] }, '_hover'],
    [{ '&:hover': { width: ['100%', '50%'] } }, 'width'],
    [{ _hover: { width: ['100%', '50%'] } }, 'width'],
    [{ _has: { '.child': ['red', 'blue'] } }, '&:has(.child)'],
    [{ [breakpoints.gte('sm')]: { width: ['100%', '50%'] } }, 'width'],
    [[{ color: 'red' }, { width: ['100%', '50%'] }], 'width'],
  ])('rejects array property values in %p', (value, property) => {
    const resolve = () => sx(value)({ theme });
    expect(resolve).toThrow(TypeError);
    expect(resolve).toThrow(`Array values are not supported for sx property "${property}". Use named breakpoint maps or explicit queries instead.`);
  });

  it('rejects property arrays even without a theme', () => {
    expect(() => sx({ width: ['100%', '50%'] })({})).toThrow(TypeError);
  });

  it('omits nullish declarations while retaining explicit media rules', () => {
    const query = breakpoints.gte('sm');
    expect(sx({ color: null, width: undefined, [query]: { color: 'red' } })({ theme })).toEqual({
      [query]: { color: 'red' },
    });
  });

  it('accepts explicit media keys using a custom breakpoint unit', () => {
    const customBreakpoints = createBreakpoints({
      values: { sm: 40, md: 52, lg: 64 },
      unit: 'em',
    });

    expect(sx({
      width: '100%',
      [customBreakpoints.gte('sm')]: { width: '50%' },
      [customBreakpoints.gte('md')]: { width: '25%' },
    })({ theme: { breakpoints: customBreakpoints } })).toEqual({
      width: '100%',
      '@media (width >= 40em)': { width: '50%' },
      '@media (width >= 52em)': { width: '25%' },
    });
  });

  it('accepts computed nested media keys from every helper', () => {
    const style = sx({
      [breakpoints.gte('sm')]: { color: 'red' },
      [breakpoints.lt('sm')]: { color: 'blue' },
      [breakpoints.between('sm', 'lg')]: { color: 'green' },
      [breakpoints.only('md')]: { color: 'black' },
    })({ theme });

    expect(style).toEqual({
      '@media (width >= 40rem)': { color: 'red' },
      '@media (width < 40rem)': { color: 'blue' },
      '@media (40rem <= width < 64rem)': { color: 'green' },
      '@media (48rem <= width < 64rem)': { color: 'black' },
    });
  });

  it.each([
    [undefined, '50%', '50%'],
    ['75%', '75%', '50%'],
  ])('merges explicit queries in composition order (explicit width: %s)', (explicitWidth, widthFirst, explicitFirst) => {
    const query = breakpoints.gte('sm');
    const widthRule = Object.freeze({ width: '50%' });
    const explicitRule = Object.freeze({
      color: 'red',
      ...(explicitWidth === undefined ? {} : { width: explicitWidth }),
    });

    expect(sx([{ [query]: widthRule }, { [query]: explicitRule }])({ theme })).toEqual({
      [query]: { width: widthFirst, color: 'red' },
    });
    expect(sx([{ [query]: explicitRule }, { [query]: widthRule }])({ theme })).toEqual({
      [query]: { width: explicitFirst, color: 'red' },
    });
  });

  it('preserves authored order when declarations use aliases for the same property', () => {
    const query = breakpoints.gte('sm');

    expect(sx([{ [query]: { width: '50%' } }, { [query]: { w: '75%', width: '80%' } }])({ theme })).toEqual({
      [query]: { width: '80%' },
    });
    expect(sx([{ [query]: { width: '75%', w: '80%' } }, { [query]: { width: '50%' } }])({ theme })).toEqual({
      [query]: { width: '50%' },
    });
  });

  it('merges nested declarations within the same explicit media rule', () => {
    const query = breakpoints.gte('sm');
    const hover = { '&:hover': { color: 'green' } };
    const rule = { '&:hover': { color: 'red', backgroundColor: 'blue' } };

    expect(sx([{ [query]: hover }, { [query]: rule }])({ theme })).toEqual({
      [query]: { '&:hover': { color: 'red', backgroundColor: 'blue' } },
    });
    expect(sx([{ [query]: rule }, { [query]: hover }])({ theme })).toEqual({
      [query]: { '&:hover': { color: 'green', backgroundColor: 'blue' } },
    });
  });

  it('emits a base declaration and a named media query', () => {
    expect(sx({ width: { _: '100%', sm: '50%' } })({ theme })).toEqual({
      width: '100%',
      [theme.breakpoints.gte('sm')]: { width: '50%' },
    });
  });
});

describe('array composition', () => {
  const breakpoints = createBreakpoints({ values: { sm: 0, md: 600, lg: 900 }, unit: 'px' });
  const theme = { breakpoints };

  it('merges explicit rules across composed items in their authored order', () => {
    const sm = breakpoints.gte('sm');
    const md = breakpoints.gte('md');
    const result = sx([
      { [md]: { color: 'red' } },
      { [sm]: { width: '50%' }, [md]: { width: '100%' } },
    ])({ theme });

    expect(Object.keys(result)).toEqual([md, sm]);
    expect(result[sm]).toEqual({ width: '50%' });
    expect(result[md]).toEqual({ color: 'red', width: '100%' });
  });

  it('preserves the authored order of explicit media rules across items', () => {
    const sm = breakpoints.gte('sm');
    const md = breakpoints.gte('md');
    const result = sx([{ [md]: { width: '100%' } }, { [sm]: { width: '50%' } }])({ theme });
    expect(Object.keys(result)).toEqual([md, sm]);
  });

  it('keeps the first position of a repeated query while merging declarations', () => {
    const sm = breakpoints.gte('sm');
    const md = breakpoints.gte('md');
    const result = sx([
      { [md]: { color: 'red' } },
      { [sm]: { color: 'blue', width: '50%' } },
      { [md]: { width: '100%' } },
    ])({ theme });

    expect(Object.entries(result)).toEqual([
      [md, { color: 'red', width: '100%' }],
      [sm, { color: 'blue', width: '50%' }],
    ]);
  });

  it('keeps explicit media rules in their authored slots', () => {
    const sm = breakpoints.gte('sm');
    const md = breakpoints.gte('md');
    const lg = breakpoints.gte('lg');
    const result = sx([
      { [md]: { color: 'red' } },
      { [lg]: { width: '50%' } },
      { [sm]: { width: '25%' } },
    ])({ theme });

    expect(Object.keys(result)).toEqual([md, lg, sm]);
  });

  it('composes nested arrays and theme functions, including a function returning an array', () => {
    const colors = { primary: 'red', secondary: 'blue' };
    const result = sx((currentTheme) => [
      null,
      { color: 'primary' },
      [{ color: 'secondary' }, { [currentTheme.breakpoints.gte('sm')]: { color: 'primary' } }],
    ])({ theme: { breakpoints, colors } });

    expect(result).toEqual({
      color: 'blue',
      [breakpoints.gte('sm')]: { color: 'red' },
    });
  });

  // A later array item overrides an earlier one's individual declarations,
  // not the whole value at that key. For a flat property this was already
  // correct (a last-write-wins overwrite). For a NESTED rule (a
  // pseudo-selector, a media query, ...), the array reduce used to do the
  // same flat overwrite on the whole nested object -- silently discarding
  // every declaration the earlier item made under that key, not just the
  // one the later item actually redeclared. This describe block guards the
  // fix: two array items touching the SAME nested selector must compose
  // their own declarations, not replace one another wholesale.
  it('overrides a flat property, later item wins', () => {
    const style = sx([{ color: 'red' }, { color: 'blue' }])({});
    expect(style).toEqual({ color: 'blue' });
  });

  it('composes two array items that both declare the same nested selector, per declaration', () => {
    const style = sx([
      { '&:hover': { backgroundColor: 'red', color: 'blue' } },
      { '&:hover': { backgroundColor: 'green' } },
    ])({});
    expect(style).toEqual({
      '&:hover': { backgroundColor: 'green', color: 'blue' },
    });
  });

  it('composes three array items on the same nested selector, later declarations win per property', () => {
    const style = sx([
      { '&:hover': { a: 1, b: 1 } },
      { '&:hover': { b: 2, c: 2 } },
      { '&:hover': { c: 3 } },
    ])({});
    expect(style).toEqual({ '&:hover': { a: 1, b: 2, c: 3 } });
  });

  it('recurses through multiple levels of nesting (a media query wrapping a pseudo-selector)', () => {
    const style = sx([
      { '@media (min-width: 320px)': { '&:hover': { color: 'red', background: 'x' } } },
      { '@media (min-width: 320px)': { '&:hover': { color: 'blue' } } },
    ])({});
    expect(style).toEqual({
      '@media (min-width: 320px)': { '&:hover': { color: 'blue', background: 'x' } },
    });
  });

  it('replaces outright, not merges, when a later item is not a plain object at the same key', () => {
    const objectThenScalar = sx([
      { '&:hover': { color: 'red' } },
      { '&:hover': 'inherit' },
    ])({});
    expect(objectThenScalar).toEqual({ '&:hover': 'inherit' });

    const scalarThenObject = sx([
      { '&:hover': 'inherit' },
      { '&:hover': { color: 'red' } },
    ])({});
    expect(scalarThenObject).toEqual({ '&:hover': { color: 'red' } });
  });
});

describe('object-form responsive values', () => {
  const breakpoints = createBreakpoints({
    values: { sm: 320, md: 744, lg: 1440 },
    unit: 'px',
  });

  const theme = {
    colors: { 'red:50': '#f24c4f', 'blue:50': '#578aef', 'green:50': '#00a94f' },
    breakpoints,
  };

  it('resolves a `{ _, sm, md, lg }` object into base value + per-breakpoint media queries', () => {
    const style = sx({
      color: { _: 'red:50', sm: 'blue:50', md: 'green:50' },
    })({ theme });

    expect(style).toEqual({
      color: '#f24c4f', // red:50
      '@media (width >= 320px)': { color: '#578aef' }, // blue:50
      '@media (width >= 744px)': { color: '#00a94f' }, // green:50
    });
  });

  it('treats `base` the same as `_` for the unconditional value', () => {
    const style = sx({
      color: { base: 'red:50', lg: 'blue:50' },
    })({ theme });

    expect(style).toEqual({
      color: '#f24c4f', // red:50
      '@media (width >= 1440px)': { color: '#578aef' }, // blue:50
    });
  });

  it('supports a per-breakpoint value that is itself a function of theme', () => {
    const style = sx({
      color: { _: 'red:50', md: (t) => t.colors['blue:50'] },
    })({ theme });

    expect(style).toEqual({
      color: '#f24c4f', // red:50
      '@media (width >= 744px)': { color: '#578aef' }, // blue:50, function already returned the resolved hex
    });
  });

  it('does not misidentify a nested-selector style object as a responsive object', () => {
    // `&:hover`'s inner object has a `color` key -- not a `_`/`base`
    // sentinel or a named breakpoint alias -- so it must pass through
    // untouched for the normal nested-selector recursion to handle.
    const style = sx({
      '&:hover': { color: 'red:50' },
    })({ theme });

    expect(style).toEqual({
      '&:hover': { color: '#f24c4f' }, // red:50, resolved by the nested-selector recursion
    });
  });

  it('drops a nullish per-breakpoint value without emitting an empty rule', () => {
    const style = sx({
      color: { _: 'red:50', sm: undefined, md: 'green:50' },
    })({ theme });

    expect(style).toEqual({
      color: '#f24c4f', // red:50
      '@media (width >= 744px)': { color: '#00a94f' }, // green:50
    });
  });

  it('emits media queries in ascending breakpoint order regardless of authoring key order', () => {
    // Authored out of order (`lg` before `sm`) -- if emitted in this literal
    // insertion order, a viewport >= 1440px would match BOTH queries and the
    // `sm` rule (emitted last) would incorrectly win the cascade over `lg`.
    const style = sx({
      color: { lg: 'blue:50', sm: 'red:50' },
    })({ theme });

    const keys = Object.keys(style);
    expect(keys).toEqual([
      '@media (width >= 320px)', // sm
      '@media (width >= 1440px)', // lg
    ]);
    expect(style).toEqual({
      '@media (width >= 320px)': { color: '#f24c4f' }, // red:50
      '@media (width >= 1440px)': { color: '#578aef' }, // blue:50
    });
  });

  it('orders thresholds numerically across declarations and accepts zero and 2xl', () => {
    const customTheme = {
      ...theme,
      breakpoints: createBreakpoints({
        values: { sm: 10.125, md: 10.5, lg: 0, '2xl': 20 },
        unit: 'em',
      }),
    };
    const style = sx({
      width: { md: '30%', sm: '20%', lg: '0%', xs: '10%', base: '100%' },
      height: { '2xl': '80%', sm: '40%' },
    })({ theme: customTheme });
    expect(Object.keys(style)).toEqual([
      'width',
      '@media (width >= 0em)',
      '@media (width >= 10.125em)',
      '@media (width >= 10.5em)',
      '@media (width >= 20em)',
    ]);
    expect(style).toEqual({
      width: '100%',
      '@media (width >= 0em)': { width: '0%' },
      '@media (width >= 10.125em)': { width: '20%', height: '40%' },
      '@media (width >= 10.5em)': { width: '30%' },
      '@media (width >= 20em)': { height: '80%' },
    });
  });

  it('merges breakpoints with equal widths without dropping later queries', () => {
    const equalTheme = {
      ...theme,
      breakpoints: createBreakpoints({ values: { sm: 10, md: 10, lg: 20 }, unit: 'em' }),
    };
    const style = sx({ width: { lg: '40%', sm: '20%', md: '30%' } })({ theme: equalTheme });
    expect(Object.keys(style)).toEqual(['@media (width >= 10em)', '@media (width >= 20em)']);
    expect(style).toEqual({
      '@media (width >= 10em)': { width: '30%' },
      '@media (width >= 20em)': { width: '40%' },
    });
  });

  it('ignores obsolete and unconfigured names, including when there is no theme', () => {
    expect(sx({ width: { xs: '10px' }, height: { _: '20px', lg: '30px' } })({})).toEqual({
      height: '20px',
    });
    const emptyTheme = { ...theme, breakpoints: createBreakpoints({ values: {} }) };
    expect(sx({ width: { xs: '10px', sm: '20px' } })({ theme: emptyTheme })).toEqual({});
  });

  it('resolves callbacks in declarations, maps and nested rules without mutating input', () => {
    const values = Object.freeze({ _: () => 'red:50', sm: t => t.colors['blue:50'] });
    const input = Object.freeze({
      color: () => values,
      '&:hover': Object.freeze({ color: { base: 'green:50', md: () => 'red:50' } }),
    });
    expect(sx(input)({ theme })).toEqual({
      color: '#f24c4f',
      '@media (width >= 320px)': { color: '#578aef' },
      '&:hover': {
        color: '#00a94f',
        '@media (width >= 744px)': { color: '#f24c4f' },
      },
    });
    expect(input.color()).toBe(values);
  });

  it('resolves callbacks expanded by functional pseudo selectors', () => {
    expect(sx({ _has: { '.child': t => ({ color: t.colors['red:50'] }) } })({ theme })).toEqual({
      '&:has(.child)': { color: '#f24c4f' },
    });
  });

  it('preserves explicit rule bodies, selector order and dark token resolution', () => {
    const modeTheme = { ...theme, colors: { dynamic: { _light: 'black', _dark: 'white' } } };
    const style = sx({
      '@container sidebar (width >= 20rem)': { display: 'grid', color: 'dynamic' },
      '@media (prefers-reduced-motion)': { display: 'block' },
      '& svg': { color: 'dynamic' },
      containerType: 'inline-size',
      containerName: 'sidebar',
    })({ theme: modeTheme, __colorMode: 'dark' });
    expect(Object.keys(style)).toEqual([
      '@container sidebar (width >= 20rem)',
      '@media (prefers-reduced-motion)',
      '& svg',
      'containerType',
      'containerName',
    ]);
    expect(style).toEqual({
      '@container sidebar (width >= 20rem)': { display: 'grid', color: 'white' },
      '@media (prefers-reduced-motion)': { display: 'block' },
      '& svg': { color: 'white' },
      containerType: 'inline-size',
      containerName: 'sidebar',
    });
  });

  it('resolves container helper keys in whole-style and nested theme callbacks', () => {
    const queryTheme = { ...theme, containerQueries: createContainerQueries(breakpoints) };
    const sidebar = queryTheme.containerQueries('sidebar');
    const style = sx(t => ({
      containerType: 'inline-size',
      containerName: 'sidebar',
      [t.containerQueries('sidebar').gte('18.75px')]: {
        display: 'grid',
        '&:hover': { color: 'red:50' },
      },
      [sidebar.between('20px', '40px')]: { width: '50%' },
    }))({ theme: queryTheme });
    expect(style).toEqual({
      containerType: 'inline-size',
      containerName: 'sidebar',
      '@container sidebar (width >= 18.75px)': {
        display: 'grid',
        '&:hover': { color: '#f24c4f' },
      },
      '@container sidebar (20px <= width < 40px)': { width: '50%' },
    });
  });

  it('retains explicit query order when a query was first generated implicitly', () => {
    const sm = breakpoints.gte('sm');
    const md = breakpoints.gte('md');
    const container = '@container sidebar (width >= 20rem)';
    const style = sx([
      { width: { md: '80%', sm: '40%' } },
      { [container]: { display: 'grid' } },
      { [sm]: { width: '50%', color: 'red' } },
    ])({ theme });
    expect(Object.keys(style)).toEqual([container, sm, md]);
    expect(style[sm]).toEqual({ width: '50%', color: 'red' });
    expect(style[md]).toEqual({ width: '80%' });
  });

  it('merges implicit and explicit rules in either author order, including aliases', () => {
    const media = breakpoints.gte('sm');
    const explicit = { [media]: { width: '50%', color: 'red' } };
    const implicit = { w: { sm: '75%' } };
    expect(sx([explicit, implicit])({ theme })[media]).toEqual({ width: '75%', color: 'red' });
    expect(sx([implicit, explicit])({ theme })[media]).toEqual({ width: '50%', color: 'red' });
  });

  it('rejects property arrays in direct, callback, nested, pseudo and map forms', () => {
    const invalid = [
      [{ width: ['100%', '50%'] }, /width/],
      [{ width: () => ['100%', '50%'] }, /width/],
      [{ '&:hover': { width: ['100%', '50%'] } }, /width/],
      [{ _hover: [{ color: 'red' }] }, /_hover/],
      [{ _has: { '.child': () => [{ color: 'red' }] } }, /has/],
      [{ width: { sm: ['50%'] } }, /width/],
      [{ width: { base: () => ['100%'] } }, /width/],
    ];
    for (const [input, property] of invalid) {
      expect(() => sx(input)({ theme })).toThrow(property);
    }
  });
});
