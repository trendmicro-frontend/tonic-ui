import text from '../text';

test('returns text styles', () => {
  const style = text({
    theme: {
      space: {
        '1x': '.25rem',
        '2x': '.5rem',
      },
      sizes: {
        '1x': '.25rem',
        '2x': '.5rem',
      },
      shadows: {
        small: '0 -1px rgba(255, 255, 255, .25)',
      },
    },
    textCombineUpright: 'digits 4',
    textDecoration: 'underline dodgerblue',
    textDecorationColor: 'red',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationThickness: '1x',
    textOrientation: 'mixed',
    textShadow: 'small',
    textUnderlineOffset: '2x',
    writingMode: 'vertical-rl',
  });
  expect(style).toEqual({
    textCombineUpright: 'digits 4',
    textDecoration: 'underline dodgerblue',
    textDecorationColor: 'red',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationThickness: '.25rem',
    textOrientation: 'mixed',
    textShadow: '0 -1px rgba(255, 255, 255, .25)',
    textUnderlineOffset: '.5rem',
    writingMode: 'vertical-rl',
  });
});
