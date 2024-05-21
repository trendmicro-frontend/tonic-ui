import color from '../color';

test('returns colors styles', () => {
  const style = color({
    color: 'gold',
    colorScheme: 'dark',
  });
  expect(style).toEqual({
    color: 'gold',
    colorScheme: 'dark',
  });
});
