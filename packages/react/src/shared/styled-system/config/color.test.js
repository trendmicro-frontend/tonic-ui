import color from './color';

test('returns colors styles', () => {
  const style = color({
    color: 'gold',
    colorScheme: 'dark',
    fill: 'black',
    stroke: 'black',
  });
  expect(style).toEqual({
    color: 'gold',
    colorScheme: 'dark',
    fill: 'black',
    stroke: 'black',
  });
});
