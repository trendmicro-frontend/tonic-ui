import shape from '../shape';

const defaultTheme = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
};

test('returns shape styles', () => {
  const style = shape({
    shapeImageThreshold: 0.7,
    shapeMargin: '50%',
    shapeOutside: 'circle(50%)',
  });
  expect(style).toEqual({
    shapeImageThreshold: 0.7,
    shapeMargin: '50%',
    shapeOutside: 'circle(50%)',
  });
});

test('returns theme values', () => {
  const style = shape({
    theme: { ...defaultTheme },
    shapeMargin: 1,
  });
  expect(style).toEqual({
    shapeMargin: 4,
  });
});
