import createTheme from '../createTheme';

describe('createTheme', () => {
  it('should create a default theme', () => {
    const theme = createTheme();
    expect(theme).toHaveProperty('borders');
    expect(theme).toHaveProperty('breakpoints');
    expect(theme).toHaveProperty('colors');
    expect(theme).toHaveProperty('fonts');
    expect(theme).toHaveProperty('fontSizes');
    expect(theme).toHaveProperty('fontWeights');
    expect(theme).toHaveProperty('letterSpacings');
    expect(theme).toHaveProperty('lineHeights');
    expect(theme).toHaveProperty('outlines');
    expect(theme).toHaveProperty('radii');
    expect(theme).toHaveProperty('shadows');
    expect(theme).toHaveProperty('sizes');
    expect(theme).toHaveProperty('space');
    expect(theme).toHaveProperty('zIndices');
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
    expect(theme.vars).not.toBeDefined();
  });

  it('should generate CSS variables', () => {
    const theme = createTheme({ cssVariables: true });
    expect(theme.vars).toBeDefined();
    expect(theme.vars.prefix).toBe('tonic');
    expect(Object.keys(theme.vars).filter(x => x.startsWith('--'))[0]).toMatch(/^--tonic-/);
  });

  it('should apply custom prefix to CSS variables', () => {
    const theme = createTheme({ cssVariables: { prefix: 'custom' } });
    expect(theme.vars).toBeDefined();
    expect(theme.vars.prefix).toBe('custom');
    expect(Object.keys(theme.vars).filter(x => x.startsWith('--'))[0]).toMatch(/^--custom-/);
  });
});
