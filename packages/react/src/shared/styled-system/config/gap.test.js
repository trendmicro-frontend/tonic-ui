import gap from './gap';

test('returns gap styles', () => {
  const style = gap({
    gap: 32,
    columnGap: 16,
    rowGap: 16,
  });
  expect(style).toEqual({
    gap: 32,
    columnGap: 16,
    rowGap: 16,
  });
});
