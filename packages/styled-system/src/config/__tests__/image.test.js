import image from '../image';

test('returns images styles', () => {
  const style = image({
    imageOrientation: '90deg',
    imageRendering: 'pixelated',
  });
  expect(style).toEqual({
    imageOrientation: '90deg',
    imageRendering: 'pixelated',
  });
});
