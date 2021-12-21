import grid from './grid';

test('returns grid styles', () => {
  const style = grid({
    gridGap: 32,
    gridColumnGap: 16,
    gridRowGap: 16,
  });
  expect(style).toEqual({
    gridGap: 32,
    gridColumnGap: 16,
    gridRowGap: 16,
  });
});
