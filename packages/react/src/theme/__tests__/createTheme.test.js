import { Box } from '@tonic-ui/react/src';
import { render } from '@tonic-ui/react/test-utils/render';
import createTheme from '../createTheme';

describe('createTheme', () => {
  const defaultThemeScales = [
    'borders',
    'breakpoints',
    'colors',
    'fonts',
    'fontSizes',
    'fontWeights',
    'letterSpacings',
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

  it('should not generate CSS variables with default configuration', () => {
    const theme = createTheme();
    expect(theme.cssVariables).not.toBeDefined();
  });

  it('should generate CSS variables', () => {
    const theme = createTheme({ cssVariables: true });
    expect(theme.cssVariables).toBeDefined();
    expect(theme.cssVariablePrefix).toBe('tonic');
    const cssVariableKeys = Object.keys(theme.cssVariables).filter(x => x.startsWith('--'));
    expect(cssVariableKeys.length).toBeGreaterThan(0);
    expect(cssVariableKeys[0]).toMatch(/^--tonic-/);
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
      <Box backgroundColor="gray:50" {...props} />
    );
    render(<TestComponent />, { theme: themeOptions });

    const styleElement = document.querySelector('style[data-emotion="css-global"]');
    expect(styleElement).toMatchSnapshot();
  });
});
