import textDecoration from './text-decoration';

test('returns text decoration styles', () => {
  const style = textDecoration({
    theme: {
      shadows: {
        small: '0 -1px rgba(255, 255, 255, .25)',
      },
    },
    textShadow: 'small',
  });
  expect(style).toEqual({
    textShadow: '0 -1px rgba(255, 255, 255, .25)',
  });
});
