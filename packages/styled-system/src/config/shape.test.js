import shape from './shape';

test('returns shape styles', () => {
  const style = shape({
    clipPath: 'rect(1px, 10em, 3rem, 2ch)',
    mask: 'url(masks.svg#star)',
  });
  expect(style).toEqual({
    clipPath: 'rect(1px, 10em, 3rem, 2ch)',
    mask: 'url(masks.svg#star)',
  });
});
