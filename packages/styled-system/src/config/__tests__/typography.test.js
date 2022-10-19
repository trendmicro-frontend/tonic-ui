import typography from '../typography';

const defaultTheme = {
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
};

test('returns typography styles', () => {
  const style = typography({
    theme: { ...defaultTheme },
    fontFamily: 'base',
    fontSize: 'md',
    fontWeight: 'bold',
    lineHeight: 'md',
  });
  expect(style).toEqual({
    fontFamily: '"Segoe UI", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif',
    fontSize: '1rem',
    fontWeight: 700,
    lineHeight: '1.375rem',
  });
});
