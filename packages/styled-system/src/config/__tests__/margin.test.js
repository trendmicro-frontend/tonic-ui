import margin from '../margin';

const defaultTheme = {
  breakpoints: [40, 52, 64].map(n => n + 'em'),
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
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

test('returns negative pixel values', () => {
  const styles = margin({
    theme: { ...defaultTheme },
    m: -2,
  });
  expect(styles).toEqual({ margin: -8 });
});

test('returns negative em values', () => {
  const styles = margin({
    theme: { ...defaultTheme },
    m: '-16em',
  });
  expect(styles).toEqual({ margin: '-16em' });
});

test('returns negative theme values', () => {
  const styles = margin({
    theme: {
      ...defaultTheme,
      space: [0, 4, 8],
    },
    m: -2,
  });
  expect(styles).toEqual({ margin: -8 });
});

test('returns positive theme values', () => {
  const styles = margin({
    theme: {
      ...defaultTheme,
      space: [0, '1em', '2em'],
    },
    m: 2,
  });
  expect(styles).toEqual({ margin: '2em' });
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
