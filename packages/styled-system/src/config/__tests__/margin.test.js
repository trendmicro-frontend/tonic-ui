import margin from '../margin';

const defaultTheme = {
  breakpoints: [40, 52, 64].map(n => n + 'em'),
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
};

const defaultThemeWithCSSVariables = {
  ...defaultTheme,
  config: {
    prefix: 'tonic',
    useCSSVariables: true,
  },
  __cssVariableMap: {
    '--tonic-breakpoints-0': '40em',
    '--tonic-breakpoints-1': '52em',
    '--tonic-breakpoints-2': '64em',
    '--tonic-space-0': 0,
    '--tonic-space-1': 4,
    '--tonic-space-2': 8,
    '--tonic-space-3': 16,
    '--tonic-space-4': 32,
    '--tonic-space-5': 64,
    '--tonic-space-6': 128,
    '--tonic-space-7': 256,
    '--tonic-space-8': 512,
  },
};

test('returns style objects', () => {
  const styles = margin({
    theme: { ...defaultTheme },
    m: '4px',
  });
  expect(styles).toEqual({ margin: '4px' });
});

test('returns 0 values', () => {
  const styles = margin({
    theme: { ...defaultTheme },
    m: 0,
  });
  expect(styles).toEqual({ margin: 0 });
});

test('returns positive pixel values', () => {
  const styles = margin({
    theme: { ...defaultTheme },
    m: 2,
  });
  expect(styles).toEqual({ margin: 8 });
});

test('returns negative pixel values', () => {
  const styles = margin({
    theme: { ...defaultTheme },
    m: -2,
  });
  expect(styles).toEqual({ margin: -8 });
});

test('returns positive em values', () => {
  const styles = margin({
    theme: { ...defaultTheme },
    m: '16em',
  });
  expect(styles).toEqual({ margin: '16em' });
});

test('returns negative em values', () => {
  const styles = margin({
    theme: { ...defaultTheme },
    m: '-16em',
  });
  expect(styles).toEqual({ margin: '-16em' });
});

test('returns positive theme values', () => {
  const styles = margin({
    theme: { ...defaultTheme },
    m: 0,
    mx: 2,
    my: 1,
  });
  expect(styles).toEqual({
    margin: 0,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 4,
    marginBottom: 4,
  });
});

test('returns negative theme values', () => {
  const styles = margin({
    theme: { ...defaultTheme },
    m: 0,
    mx: -2,
    my: -1,
  });
  expect(styles).toEqual({
    margin: 0,
    marginLeft: -8,
    marginRight: -8,
    marginTop: -4,
    marginBottom: -4,
  });
});

test('returns positive theme values using CSS variables', () => {
  const style = margin({
    theme: { ...defaultThemeWithCSSVariables },
    m: 0,
    mx: 2,
    my: 1,
  });
  expect(style).toEqual({
    margin: 'var(--tonic-space-0)',
    marginLeft: 'var(--tonic-space-2)',
    marginRight: 'var(--tonic-space-2)',
    marginTop: 'var(--tonic-space-1)',
    marginBottom: 'var(--tonic-space-1)',
  });
});

test('returns negative theme values using CSS variables', () => {
  const style = margin({
    theme: { ...defaultThemeWithCSSVariables },
    m: 0,
    mx: -2,
    my: -1,
  });
  expect(style).toEqual({
    margin: 'var(--tonic-space-0)',
    marginLeft: 'calc(0 - var(--tonic-space-2))',
    marginRight: 'calc(0 - var(--tonic-space-2))',
    marginTop: 'calc(0 - var(--tonic-space-1))',
    marginBottom: 'calc(0 - var(--tonic-space-1))',
  });
});

test('returns responsive values', () => {
  const styles = margin({
    theme: { ...defaultTheme },
    m: [0, 2, 3],
  });
  expect(styles).toEqual({
    margin: 0,
    '@media screen and (min-width: 40em)': { margin: 8 },
    '@media screen and (min-width: 52em)': { margin: 16 },
  });
});

test('returns negative string values from theme', () => {
  const styles = margin({
    theme: {
      ...defaultTheme,
      space: [0, '1em'],
    },
    margin: -1,
  });
  expect(styles).toEqual({ margin: '-1em' });
});

test('returns values from theme object', () => {
  const styles = margin({
    theme: {
      ...defaultTheme,
      space: { sm: 1 },
    },
    margin: 'sm',
  });
  expect(styles).toEqual({ margin: 1 });
});

test('mx prop overrides mr prop', () => {
  const styles = margin({
    theme: { ...defaultTheme },
    mr: 1,
    mx: 2,
  });
  expect(styles).toEqual({ marginLeft: 8, marginRight: 8 });
});

test('my prop overrides mt prop', () => {
  const styles = margin({
    theme: { ...defaultTheme },
    mt: 1,
    my: 2,
  });
  expect(styles).toEqual({ marginTop: 8, marginBottom: 8 });
});

test('margin overrides m prop', () => {
  const styles = margin({
    theme: { ...defaultTheme },
    m: 1,
    margin: 2,
  });
  expect(styles).toEqual({ margin: 8 });
});

test('handles margin with no theme', () => {
  const styles = margin({
    theme: { ...defaultTheme },
    mt: 12,
  });
  expect(styles).toEqual({
    marginTop: 12,
  });
});

test('handles overriding margin shorthand props', () => {
  const styles = margin({
    theme: { ...defaultTheme },
    m: 4,
    mx: 3,
    mr: 2,
  });
  expect(styles).toEqual({
    margin: 32,
    marginLeft: 16,
    marginRight: 8,
  });
});

test('single directions override axes', () => {
  const styles = margin({
    theme: { ...defaultTheme },
    mx: 3,
    ml: 1,
    mr: 2,
  });
  expect(styles).toEqual({
    marginLeft: 4,
    marginRight: 8,
  });
});

test('supports object values', () => {
  const styles = margin({
    theme: { ...defaultTheme },
    m: {
      _: 0,
      0: 1,
      1: 2,
    }
  });
  expect(styles).toEqual({
    margin: 0,
    '@media screen and (min-width: 40em)': {
      margin: 4,
    },
    '@media screen and (min-width: 52em)': {
      margin: 8,
    },
  });
});

test('supports non-array breakpoints', () => {
  const theme = {
    ...defaultTheme,
    disableStyledSystemCache: true,
    breakpoints: {
      small: '40em',
      medium: '52em',
    }
  };
  const styles = margin({
    theme,
    m: {
      _: 0,
      small: 1,
      medium: 2,
    }
  });
  expect(styles).toEqual({
    margin: 0,
    '@media screen and (min-width: 40em)': {
      margin: 4,
    },
    '@media screen and (min-width: 52em)': {
      margin: 8,
    },
  });
});

test('logical block start and end margins', () => {
  const styles = margin({
    theme: { ...defaultTheme },
    marginBlock: 'auto',
    marginBlockStart: '10px',
    marginBlockEnd: '20px',
  });
  expect(styles).toEqual({
    marginBlock: 'auto',
    marginBlockStart: '10px',
    marginBlockEnd: '20px',
  });
});

test('logical inline start and end margins', () => {
  const styles = margin({
    theme: { ...defaultTheme },
    marginInline: 'auto',
    marginInlineStart: '10px',
    marginInlineEnd: '20px',
  });
  expect(styles).toEqual({
    marginInline: 'auto',
    marginInlineStart: '10px',
    marginInlineEnd: '20px',
  });
});
