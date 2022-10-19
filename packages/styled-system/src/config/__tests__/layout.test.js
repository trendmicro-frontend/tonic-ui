import layout from '../layout';

const defaultTheme = {
  breakpoints: [40, 52, 64].map(n => n + 'em'),
  sizes: [0, 4, 8, 16, 32, 64, 128, 256, 512],
};

test('returns layout styles', () => {
  const style = layout({
    theme: { ...defaultTheme },
    width: '100%',
    height: '100%',
    minWidth: 2,
    maxWidth: 5,
    minHeight: 0,
    maxHeight: 6,
  });
  expect(style).toEqual({
    width: '100%',
    height: '100%',
    minWidth: 8,
    maxWidth: 64,
    minHeight: 0,
    maxHeight: 128,
  });
});

test('returns responsive values', () => {
  const style = layout({
    theme: { ...defaultTheme },
    width: ['100%', '50%', '25%'],
    minHeight: 32,
    maxWidth: 768,
  });
  expect(style).toEqual({
    width: '100%',
    maxWidth: 768,
    minHeight: 32,
    '@media screen and (min-width: 40em)': {
      width: '50%',
    },
    '@media screen and (min-width: 52em)': {
      width: '25%',
    },
  });
});

test('returns 0 from theme.sizes', () => {
  const style = layout({
    theme: {
      ...defaultTheme,
      sizes: [24, 48, 96],
    },
    width: 0,
    height: 0,
  });
  expect(style).toEqual({
    width: 24,
    height: 24,
  });
});

test('w prop overrides width prop', () => {
  const styles = layout({
    theme: { ...defaultTheme },
    width: 200,
    w: 100,
  });
  expect(styles).toEqual({
    width: 100,
  });
});

test('h prop overrides height prop', () => {
  const styles = layout({
    theme: { ...defaultTheme },
    height: 200,
    h: 100,
  });
  expect(styles).toEqual({
    height: 100,
  });
});
