import gap from '../gap';

test('returns gap styles', () => {
  const style = gap({
    theme: {
      sizes: {
        '1x': '.25rem',
        '2x': '.5rem',
        '3x': '.75rem',
        '4x': '1rem',
      },
    },
    gap: '1x',
    columnGap: '2x',
    rowGap: '4x',
  });
  expect(style).toEqual({
    gap: '.25rem',
    columnGap: '.5rem',
    rowGap: '1rem',
  });
});
