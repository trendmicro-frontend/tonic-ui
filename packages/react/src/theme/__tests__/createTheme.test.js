import React from 'react';
import { Box } from '@tonic-ui/react/src';
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
