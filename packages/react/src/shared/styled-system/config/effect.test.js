import effect from './effect';

test('returns effect styles', () => {
  const style = effect({
    theme: {
      shadows: {
        small: '0 1px 4px rgba(0, 0, 0, .125)',
      },
    },
    boxShadow: 'small',
  });
  expect(style).toEqual({
    boxShadow: '0 1px 4px rgba(0, 0, 0, .125)',
  });
});
