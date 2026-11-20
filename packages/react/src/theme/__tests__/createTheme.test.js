import React from 'react';
import { Box, useTheme } from '@tonic-ui/react/src';
import { render } from '@tonic-ui/react/test-utils/render';
import { TONIC_THEME } from '../constants';
import createTheme from '../createTheme';

describe('createTheme', () => {
  const defaultThemeScales = [
    'borders',
    'breakpoints',
    'colors',
    'fonts',
    'fontSizes',
    'fontWeights',
    'lineHeights',
    'outlines',
    'radii',
    'shadows',
    'sizes',
    'space',
    'zIndices',
  ];

  it('should create a default theme', () => {
    const theme = createTheme();
    defaultThemeScales.forEach(scale => expect(theme).toHaveProperty(scale));
  });

  it('replaces breakpoint values and rebuilds helpers without mutating the original', () => {
    const values = { lg: 1280, xs: 0, sm: 640 };
    const original = createTheme({ breakpoints: { values, unit: 'em' } });
    const extended = createTheme(original, { breakpoints: { values: { xs: 0, lg: 1000 } } });
    values.sm = 1;

    expect(original.breakpoints.keys).toEqual(['xs', 'sm', 'lg']);
    expect(original.breakpoints.gte('sm')).toBe('@media (width >= 640em)');
    expect(original.breakpoints.values.md).toBeUndefined();
    expect(extended.breakpoints.lt('lg')).toBe('@media (width < 1000em)');
    expect(extended.breakpoints.values.sm).toBeUndefined();
  });

  it('exposes immutable breakpoint widths across the base theme and color modes', () => {
    const theme = createTheme();
    for (const variant of [theme, theme.toColorMode('light'), theme.toColorMode('dark')]) {
      expect(Reflect.set(variant, 'breakpoints', {})).toBe(false);
      expect(Reflect.set(variant.breakpoints.values, 'md', 1)).toBe(false);
      expect(Reflect.set(variant.breakpoints.keys, 0, 'xl')).toBe(false);
      expect(variant.breakpoints.values.md).toBe(900);
      expect(variant.breakpoints.gte('md')).toBe('@media (width >= 900px)');
    }
    expect(theme.toColorMode('dark').get('breakpoints.values.md')).toBe(900);
    expect(theme.toColorMode('light').get('breakpoints.values.md')).toBe(900);
    expect(createTheme(theme, { breakpoints: { values: { md: 1000 } } }).breakpoints.gte('md')).toBe('@media (width >= 1000px)');
    expect(theme.breakpoints.gte('md')).toBe('@media (width >= 900px)');
  });

  it('keeps empty breakpoint scales, rejects legacy inputs and excludes breakpoint CSS variables', () => {
    const theme = createTheme({ breakpoints: { values: {} } });
    expect(theme.breakpoints.keys).toEqual([]);
    expect(() => createTheme({ breakpoints: [] })).toThrow(TypeError);
    expect(() => createTheme({}, { breakpoints: null })).toThrow(TypeError);
    expect(Object.keys(theme.cssVariables).some(key => key.startsWith('--tonic-breakpoints'))).toBe(false);
    expect(theme.cssVariables['--tonic-space-1x']).toBeDefined();
  });

  it('uses base-first responsive props and explicit media rules on a Box', () => {
    const { container } = render(<Box display={['block', 'inline', 'flex', 'grid', 'inline-block', 'none']} />);
    expect(container.firstChild).toHaveStyleRule('display', 'block');
    const cases = [[0, 'inline'], [600, 'flex'], [900, 'grid'], [1200, 'inline-block'], [1536, 'none']];
    for (const [width, display] of cases) {
      expect(container.firstChild).toHaveStyleRule('display', display, { media: `(width >= ${width}px)` });
    }

    function MediaExample() {
      const { breakpoints } = useTheme();
      return <Box sx={{ backgroundColor: 'red', [breakpoints.only('md')]: { backgroundColor: 'blue' } }} />;
    }
    const example = render(<MediaExample />).container.firstChild;
    expect(example).toHaveStyleRule('background-color', 'red');
    expect(example).toHaveStyleRule('background-color', 'blue', {
      media: '(900px <= width < 1200px)',
    });
  });

  it('should stamp the TONIC_THEME symbol on the returned theme', () => {
    const theme = createTheme();
    expect(theme[TONIC_THEME]).toBe(true);
  });

  it('should merge custom theme options', () => {
    const theme = createTheme();
    const customTheme = createTheme(theme, {
      colors: {
        'black:emphasis': 'rgb(0, 0, 0)',
        'white:emphasis': 'rgb(255, 255, 255)',
      },
    });
    expect(theme.colors['black:emphasis']).toBe('rgba(0, 0, 0, 1.0)');
    expect(theme.colors['white:emphasis']).toBe('rgba(255, 255, 255, 1.0)');
    expect(customTheme.colors['black:emphasis']).toBe('rgb(0, 0, 0)');
    expect(customTheme.colors['white:emphasis']).toBe('rgb(255, 255, 255)');
  });

  it('should merge additional arguments into the theme', () => {
    const additionalConfig = { components: { Button: { defaultProps: { size: 'large' } } } };
    const theme = createTheme({}, additionalConfig);
    expect(theme.components.Button.defaultProps.size).toBe('large');
  });

  it('should generate CSS variables by default', () => {
    const theme = createTheme();
    expect(theme.cssVariables).toBeDefined();
    expect(theme.cssVariablePrefix).toBe('tonic');
    const cssVariableKeys = Object.keys(theme.cssVariables).filter(x => x.startsWith('--'));
    expect(cssVariableKeys.length).toBeGreaterThan(0);
    expect(cssVariableKeys[0]).toMatch(/^--tonic-/);
  });

  it('should freeze the generated CSS variables to prevent mutation', () => {
    const theme = createTheme();
    expect(Object.isFrozen(theme.cssVariables)).toBe(true);
  });

  it('should generate CSS variables for primitive color variants (main + lightness/darkness)', () => {
    const theme = createTheme();
    const vars = theme.cssVariables;
    // Base alias points to main
    expect(vars['--tonic-colors-red-600']).toBe('var(--tonic-colors-red-600-main)');
    // Main value is defined
    expect(vars['--tonic-colors-red-600-main']).toBe('#dd1128');
    // Lighten variants are generated
    expect(vars['--tonic-colors-red-600-lighten-80']).toBe('#e02439');
    expect(vars['--tonic-colors-red-600-lighten-160']).toBe('#e2374a');
    // Darken variants are generated
    expect(vars['--tonic-colors-red-600-darken-80']).toBe('#cf1025');
    expect(vars['--tonic-colors-red-600-darken-160']).toBe('#c20f22');
    // Same for blue
    expect(vars['--tonic-colors-blue-600']).toBe('var(--tonic-colors-blue-600-main)');
    expect(vars['--tonic-colors-blue-600-main']).toBe('#1362fc');
    expect(vars['--tonic-colors-blue-600-lighten-80']).toBe('#266ffc');
  });

  it('should apply custom prefix to CSS variables', () => {
    const theme = createTheme({ cssVariables: { prefix: 'custom' } });
    expect(theme.cssVariables).toBeDefined();
    expect(theme.cssVariablePrefix).toBe('custom');
    const cssVariableKeys = Object.keys(theme.cssVariables).filter(x => x.startsWith('--'));
    expect(cssVariableKeys.length).toBeGreaterThan(0);
    expect(cssVariableKeys[0]).toMatch(/^--custom-/);
  });

  it('should allow an empty prefix for CSS variables', () => {
    const theme = createTheme({ cssVariables: { prefix: '' } });
    expect(theme.cssVariables).toBeDefined();
    expect(theme.cssVariablePrefix).toBe('');
    const cssVariableKeys = Object.keys(theme.cssVariables).filter(x => x.startsWith('--'));
    expect(cssVariableKeys.length).toBeGreaterThan(0);
    cssVariableKeys.forEach(key => {
      const isValid = defaultThemeScales.some(scale => key.startsWith(`--${scale}`));
      expect(isValid).toBe(true);
    });
  });

  it('should apply custom `rootSelector` for CSS variables', () => {
    const customRootSelector = ':root[data-color-scheme]';
    const themeOptions = {
      cssVariables: {
        rootSelector: customRootSelector,
      },
    };

    const theme = createTheme(themeOptions);
    expect(theme.rootSelector).toBe(customRootSelector);

    const TestComponent = (props) => (
      <Box backgroundColor="background.low" {...props} />
    );
    render(<TestComponent />, { theme: themeOptions });

    const styleElement = document.querySelector('style[data-emotion="css-global"]');
    expect(styleElement).toMatchSnapshot();
  });
});
