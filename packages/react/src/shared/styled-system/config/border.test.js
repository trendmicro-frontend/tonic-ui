import border from './border';

test('returns border styles', () => {
  const style = border({ border: '1px solid gold' });
  expect(style).toEqual({ border: '1px solid gold' });
});

test('returns individual border styles', () => {
  const style = border({
    theme: {
      sizes: {
        '1q': '.0625rem',
        '1h': '.125rem',
        '1x': '.25rem',
      },
      colors: {
        primary: 'red',
      },
      radii: {
        small: 5,
      },
    },
    borderWidth: '1q',
    borderTopWidth: '1q',
    borderTopColor: 'primary',
    borderTopStyle: 'solid',
    borderTopLeftRadius: 'small',
    borderTopRightRadius: 'small',
    borderBottomWidth: '1q',
    borderBottomColor: 'primary',
    borderBottomStyle: 'solid',
    borderBottomLeftRadius: 'small',
    borderBottomRightRadius: 'small',
    borderRightWidth: '1q',
    borderRightColor: 'primary',
    borderRightStyle: 'solid',
    borderLeftWidth: '1q',
    borderLeftColor: 'primary',
    borderLeftStyle: 'solid',
  });
  expect(style).toEqual({
    borderWidth: '.0625rem',
    borderTopColor: 'red',
    borderTopWidth: '.0625rem',
    borderTopStyle: 'solid',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomColor: 'red',
    borderBottomWidth: '.0625rem',
    borderBottomStyle: 'solid',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderRightColor: 'red',
    borderRightWidth: '.0625rem',
    borderRightStyle: 'solid',
    borderLeftColor: 'red',
    borderLeftWidth: '.0625rem',
    borderLeftStyle: 'solid',
  });
});

test('returns border top and bottom radii', () => {
  const style = border({
    theme: {
      radii: {
        small: 5,
      },
    },
    borderTopLeftRadius: 'small',
    borderTopRightRadius: 'small',
    borderBottomLeftRadius: 'small',
    borderBottomRightRadius: 'small',
  });
  expect(style).toEqual({
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  });
});
