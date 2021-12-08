import outline from './outline';

test('returns outline styles', () => {
  const style = outline({
    outline: 'thick double #32a1ce',
  });
  expect(style).toEqual({
    outline: 'thick double #32a1ce',
  });
});

test('returns individual outline styles', () => {
  const style = outline({
    theme: {
      sizes: {
        thin: 1,
        thick: 4,
      },
      colors: {
        primary: 'red',
      },
    },
    outlineColor: 'primary',
    outlineWidth: 'thin',
    outlineStyle: 'solid',
  });
  expect(style).toEqual({
    outlineColor: 'red',
    outlineWidth: 1,
    outlineStyle: 'solid',
  });
});
