import outline from '../outline';

const defaultTheme = {
  breakpoints: [40, 52, 64].map(n => n + 'em'),
  size: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
};

describe('outline in high-contrast mode', () => {
  test('should add "outline" and "outlineOffset" properties', () => {
    const expected = {
      outline: '2px solid transparent',
      outlineOffset: '2px',
    };

    expect(outline({ outline: 'none' })).toEqual(expected);
    expect(outline({ outline: '0' })).toEqual(expected);
    expect(outline({ outline: 0 })).toEqual(expected);
  });
});

test('returns outline styles', () => {
  const style = outline({
    theme: {
      ...defaultTheme,
      sizes: {
        ...defaultTheme?.sizes,
        thin: 1,
        thick: 4,
      },
      colors: {
        primary: 'red',
      },
    },
    outline: 'thick double #32a1ce',
    outlineColor: 'primary',
    outlineOffset: -1,
    outlineWidth: 'thin',
    outlineStyle: 'solid',
  });
  expect(style).toEqual({
    outline: 'thick double #32a1ce',
    outlineColor: 'red',
    outlineOffset: -4,
    outlineWidth: 1,
    outlineStyle: 'solid',
  });
});
