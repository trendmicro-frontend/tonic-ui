import defaultTheme from '../src';
import absolutePx from '../src/absolute/px';
import relativeRem from '../src/relative/rem';
import _borders from '../src/foundations/borders';
import _borderStyles from '../src/foundations/borderStyles';
import _borderWidths from '../src/foundations/borderWidths';
import _breakpoints from '../src/foundations/breakpoints';
import _colors from '../src/foundations/colors';
import _fonts from '../src/foundations/fonts';
import _fontSizes from '../src/foundations/fontSizes';
import _fontWeights from '../src/foundations/fontWeights';
import _letterSpacings from '../src/foundations/letterSpacings';
import _lineHeights from '../src/foundations/lineHeights';
import _radii from '../src/foundations/radii';
import _shadows from '../src/foundations/shadows';
import _sizes from '../src/foundations/sizes';
import _space from '../src/foundations/space';
import _zIndices from '../src/foundations/zIndices';

test('the default export must have all properties defined in the theme object', () => {
  expect(defaultTheme).toHaveProperty('borders', _borders);
  expect(defaultTheme).toHaveProperty('borderStyles', _borderStyles);
  expect(defaultTheme).toHaveProperty('borderWidths', _borderWidths);
  expect(defaultTheme).toHaveProperty('breakpoints', _breakpoints);
  expect(defaultTheme).toHaveProperty('colors', _colors);
  expect(defaultTheme).toHaveProperty('fonts', _fonts);
  expect(defaultTheme).toHaveProperty('fontSizes', _fontSizes);
  expect(defaultTheme).toHaveProperty('fontWeights', _fontWeights);
  expect(defaultTheme).toHaveProperty('letterSpacings', _letterSpacings);
  expect(defaultTheme).toHaveProperty('lineHeights', _lineHeights);
  expect(defaultTheme).toHaveProperty('radii', _radii);
  expect(defaultTheme).toHaveProperty('shadows', _shadows);
  expect(defaultTheme).toHaveProperty('sizes', _sizes);
  expect(defaultTheme).toHaveProperty('space', _space);
  expect(defaultTheme).toHaveProperty('zIndices', _zIndices);
});

test('absolute length units: px', () => {
  const { 
    borders,
    borderStyles,
    borderWidths,
    breakpoints,
    colors,
    fonts,
    fontSizes,
    fontWeights,
    letterSpacings,
    lineHeights,
    radii,
    shadows,
    sizes,
    space,
    zIndices,
  } = absolutePx;

  expect(borders).toEqual({
    none: 0,
    1: '1px solid',
    2: '2px solid',
  });

  expect(borderStyles).toEqual({});

  expect(borderWidths).toEqual({
    none: 0,
    1: '1px',
    2: '2px',
  });

  expect([ ...breakpoints ]).toEqual([
    '320px',
    '640px',
    '1024px',
    '1280px',
    '1680px',
  ]);

  expect(colors).toEqual({
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
  });

  expect(fonts).toEqual({
    base: '"Segoe UI", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif',
    mono: '"Segoe UI Mono", "SFMono-Medium", "SF Mono", Menlo, Consolas, Courier, monospace',
  });

  expect(fontSizes).toEqual({
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '28px',
    '4xl': '32px',
  });

  expect(fontWeights).toEqual({
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  });

  expect(letterSpacings).toEqual({});

  expect(lineHeights).toEqual({
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
  });

  expect(radii).toEqual({
    circle: '50%',
    none: 0,
    sm: '3px',
    md: '6px',
    lg: '12px',
  });

  expect(shadows).toEqual({
    none: 'none',
  });

  expect(sizes).toEqual(space);

  expect(space).toEqual({
    '1q': '1px',
    '2q': '2px',
    '3q': '3px',
    '4q': '4px',
    '5q': '5px',
    '6q': '6px',
    '7q': '7px',
    '8q': '8px',
    '9q': '9px',
    '10q': '10px',
    '1h': '2px',
    '2h': '4px',
    '3h': '6px',
    '4h': '8px',
    '5h': '10px',
    '6h': '12px',
    '7h': '14px',
    '8h': '16px',
    '9h': '18px',
    '10h': '20px',
    '1x': '4px',
    '2x': '8px',
    '3x': '12px',
    '4x': '16px',
    '5x': '20px',
    '6x': '24px',
    '7x': '28px',
    '8x': '32px',
    '9x': '36px',
    '10x': '40px',
    '11x': '44px',
    '12x': '48px',
    '13x': '52px',
    '14x': '56px',
    '15x': '60px',
    '16x': '64px',
    '17x': '68px',
    '18x': '72px',
    '19x': '76px',
    '20x': '80px',
    '24x': '96px',
    '32x': '128px',
    '40x': '160px',
    '48x': '192px',
    '56x': '224px',
    '64x': '256px',
    '-1q': '-1px',
    '-2q': '-2px',
    '-3q': '-3px',
    '-4q': '-4px',
    '-5q': '-5px',
    '-6q': '-6px',
    '-7q': '-7px',
    '-8q': '-8px',
    '-9q': '-9px',
    '-10q': '-10px',
    '-1h': '-2px',
    '-2h': '-4px',
    '-3h': '-6px',
    '-4h': '-8px',
    '-5h': '-10px',
    '-6h': '-12px',
    '-7h': '-14px',
    '-8h': '-16px',
    '-9h': '-18px',
    '-10h': '-20px',
    '-1x': '-4px',
    '-2x': '-8px',
    '-3x': '-12px',
    '-4x': '-16px',
    '-5x': '-20px',
    '-6x': '-24px',
    '-7x': '-28px',
    '-8x': '-32px',
    '-9x': '-36px',
    '-10x': '-40px',
    '-11x': '-44px',
    '-12x': '-48px',
    '-13x': '-52px',
    '-14x': '-56px',
    '-15x': '-60px',
    '-16x': '-64px',
    '-17x': '-68px',
    '-18x': '-72px',
    '-19x': '-76px',
    '-20x': '-80px',
    '-24x': '-96px',
    '-32x': '-128px',
    '-40x': '-160px',
    '-48x': '-192px',
    '-56x': '-224px',
    '-64x': '-256px',
  });

  expect(zIndices).toEqual({
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
  });
});

test('relative length units: rem', () => {
  const { 
    borders,
    borderStyles,
    borderWidths,
    breakpoints,
    colors,
    fonts,
    fontSizes,
    fontWeights,
    letterSpacings,
    lineHeights,
    radii,
    shadows,
    sizes,
    space,
    zIndices,
  } = relativeRem;

  expect(borders).toEqual({
    none: 0,
    1: '1px solid',
    2: '2px solid',
  });

  expect(borderStyles).toEqual({});

  expect(borderWidths).toEqual({
    none: 0,
    1: '1px',
    2: '2px',
  });

  expect([ ...breakpoints ]).toEqual([
    '320px',
    '640px',
    '1024px',
    '1280px',
    '1680px',
  ]);

  expect(colors).toEqual({
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
  });

  expect(fonts).toEqual({
    base: '"Segoe UI", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif',
    mono: '"Segoe UI Mono", "SFMono-Medium", "SF Mono", Menlo, Consolas, Courier, monospace',
  });

  expect(fontSizes).toEqual({
    xs: '.75rem',
    sm: '.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.75rem',
    '4xl': '2rem',
  });

  expect(fontWeights).toEqual({
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  });

  expect(letterSpacings).toEqual({});

  expect(lineHeights).toEqual({
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
  });

  expect(radii).toEqual({
    circle: '50%',
    none: 0,
    sm: '.1875rem',
    md: '.375rem',
    lg: '.75rem',
  });

  expect(shadows).toEqual({
    none: 'none',
  });

  expect(sizes).toEqual(space);

  expect(space).toEqual({
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
    '-1q': '-.0625rem',
    '-2q': '-.125rem',
    '-3q': '-.1875rem',
    '-4q': '-.25rem',
    '-5q': '-.3125rem',
    '-6q': '-.375rem',
    '-7q': '-.4375rem',
    '-8q': '-.5rem',
    '-9q': '-.5625rem',
    '-10q': '-.625rem',
    '-1h': '-.125rem',
    '-2h': '-.25rem',
    '-3h': '-.375rem',
    '-4h': '-.5rem',
    '-5h': '-.625rem',
    '-6h': '-.75rem',
    '-7h': '-.875rem',
    '-8h': '-1rem',
    '-9h': '-1.125rem',
    '-10h': '-1.25rem',
    '-1x': '-.25rem',
    '-2x': '-.5rem',
    '-3x': '-.75rem',
    '-4x': '-1rem',
    '-5x': '-1.25rem',
    '-6x': '-1.5rem',
    '-7x': '-1.75rem',
    '-8x': '-2rem',
    '-9x': '-2.25rem',
    '-10x': '-2.5rem',
    '-11x': '-2.75rem',
    '-12x': '-3rem',
    '-13x': '-3.25rem',
    '-14x': '-3.5rem',
    '-15x': '-3.75rem',
    '-16x': '-4rem',
    '-17x': '-4.25rem',
    '-18x': '-4.5rem',
    '-19x': '-4.75rem',
    '-20x': '-5rem',
    '-24x': '-6rem',
    '-32x': '-8rem',
    '-40x': '-10rem',
    '-48x': '-12rem',
    '-56x': '-14rem',
    '-64x': '-16rem',
  });

  expect(zIndices).toEqual({
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
  });
});
