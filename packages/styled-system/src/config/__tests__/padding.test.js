import padding from '../padding';

const defaultTheme = {
  breakpoints: [40, 52, 64].map(n => n + 'em'),
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
};

test('returns style objects', () => {
  const styles = padding({
    theme: { ...defaultTheme },
    p: '4px',
  });
  expect(styles).toEqual({ padding: '4px' });
});

test('returns 0 values', () => {
  const styles = padding({
    theme: { ...defaultTheme },
    p: 0,
  });
  expect(styles).toEqual({ padding: 0 });
});

test('returns pixel values', () => {
  const styles = padding({
    theme: { ...defaultTheme },
    p: 2,
  });
  expect(styles).toEqual({ padding: 8 });
});

test('returns em values', () => {
  const styles = padding({
    theme: { ...defaultTheme },
    p: '-16em',
  });
  expect(styles).toEqual({ padding: '-16em' });
});

test('returns theme values', () => {
  const styles = padding({
    theme: {
      ...defaultTheme,
      space: [0, '1em', '2em'],
    },
    p: 2,
  });
  expect(styles).toEqual({ padding: '2em' });
});

test('returns responsive values', () => {
  const styles = padding({
    theme: { ...defaultTheme },
    p: [0, 2, 3],
  });
  expect(styles).toEqual({
    padding: 0,
    '@media screen and (min-width: 40em)': { padding: 8 },
    '@media screen and (min-width: 52em)': { padding: 16 },
  });
});

test('returns aliased values', () => {
  const styles = padding({
    theme: { ...defaultTheme },
    px: 2,
  });
  expect(styles).toEqual({ paddingLeft: 8, paddingRight: 8 });
});

test('returns string values from theme', () => {
  const styles = padding({
    theme: {
      ...defaultTheme,
      space: [0, '1em'],
    },
    padding: 1,
  });
  expect(styles).toEqual({ padding: '1em' });
});

test('returns values from theme object', () => {
  const styles = padding({
    theme: {
      ...defaultTheme,
      space: { sm: 1 },
    },
    padding: 'sm',
  });
  expect(styles).toEqual({ padding: 1 });
});

test('pl prop sets paddingLeft', () => {
  const styles = padding({
    theme: { ...defaultTheme },
    pl: 2,
  });
  expect(styles).toEqual({ paddingLeft: 8 });
});

test('pl prop sets paddingLeft 0', () => {
  const styles = padding({
    theme: { ...defaultTheme },
    pl: 0,
  });
  expect(styles).toEqual({ paddingLeft: 0 });
});

test('px prop overrides pl prop', () => {
  const styles = padding({
    theme: { ...defaultTheme },
    pl: 1,
    px: 2,
  });
  expect(styles).toEqual({ paddingLeft: 8, paddingRight: 8 });
});

test('py prop overrides pb prop', () => {
  const styles = padding({
    theme: { ...defaultTheme },
    pb: 1,
    py: 2,
  });
  expect(styles).toEqual({ paddingTop: 8, paddingBottom: 8 });
});

test('padding prop overrides p prop', () => {
  const styles = padding({
    theme: { ...defaultTheme },
    p: 1,
    padding: 2,
  });
  expect(styles).toEqual({ padding: 8 });
});

test('handles padding with no theme', () => {
  const styles = padding({
    theme: { ...defaultTheme },
    pt: 12,
  });
  expect(styles).toEqual({
    paddingTop: 12,
  });
});

test('handles overriding padding shorthand props', () => {
  const styles = padding({
    theme: { ...defaultTheme },
    p: 4,
    py: 3,
    pt: 2,
  });
  expect(styles).toEqual({
    padding: 32,
    paddingBottom: 16,
    paddingTop: 8,
  });
});

test('single directions override axes', () => {
  const styles = padding({
    theme: { ...defaultTheme },
    px: 3,
    pl: 1,
    pr: 2,
  });
  expect(styles).toEqual({
    paddingLeft: 4,
    paddingRight: 8,
  });
});

test('supports object values', () => {
  const styles = padding({
    theme: { ...defaultTheme },
    p: {
      _: 0,
      0: 1,
      1: 2,
    }
  });
  expect(styles).toEqual({
    padding: 0,
    '@media screen and (min-width: 40em)': {
      padding: 4,
    },
    '@media screen and (min-width: 52em)': {
      padding: 8,
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
  const styles = padding({
    theme,
    p: {
      _: 0,
      small: 1,
      medium: 2,
    },
  });
  expect(styles).toEqual({
    padding: 0,
    '@media screen and (min-width: 40em)': {
      padding: 4,
    },
    '@media screen and (min-width: 52em)': {
      padding: 8,
    },
  });
});
