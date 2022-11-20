import border from '../border';

test('returns border styles', () => {
  const style = border({
    theme: {
      sizes: {
        '1q': '.0625rem',
        '1h': '.125rem',
        '1x': '.25rem',
      },
      space: {
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

    // border
    border: '1px solid red',
    borderWidth: '1q',
    borderTopColor: 'primary',
    borderTopStyle: 'solid',
    borderTopWidth: '1q',
    borderRightColor: 'primary',
    borderRightStyle: 'solid',
    borderRightWidth: '1q',
    borderBottomColor: 'primary',
    borderBottomStyle: 'solid',
    borderBottomWidth: '1q',
    borderLeftColor: 'primary',
    borderLeftStyle: 'solid',
    borderLeftWidth: '1q',

    // border-radius
    borderTopLeftRadius: 'small',
    borderTopRightRadius: 'small',
    borderBottomLeftRadius: 'small',
    borderBottomRightRadius: 'small',
    borderEndEndRadius: '80px 80px',
    borderEndStartRadius: '80px 80px',
    borderStartEndRadius: '80px 80px',
    borderStartStartRadius: '80px 80px',

    // border-block
    borderBlock: '1px solid red',
    borderBlockColor: 'primary',
    borderBlockStyle: 'solid',
    borderBlockWidth: '1q',
    borderBlockEnd: '1px solid red',
    borderBlockEndColor: 'primary',
    borderBlockEndStyle: 'solid',
    borderBlockEndWidth: '1q',
    borderBlockStart: '1px solid red',
    borderBlockStartColor: 'primary',
    borderBlockStartStyle: 'solid',
    borderBlockStartWidth: '1q',

    // border-image
    borderImage: 'url(border.png) 30 30 round',
    borderImageOutset: '1x',
    borderImageRepeat: 'round',
    borderImageSlice: '30%',
    borderImageSource: 'url(border.png)',
    borderImageWidth: '1x',

    // border-inline
    borderInline: '1px solid red',
    borderInlineColor: 'primary',
    borderInlineStyle: 'solid',
    borderInlineWidth: '1q',
    borderInlineEnd: '1px solid red',
    borderInlineEndColor: 'primary',
    borderInlineEndStyle: 'solid',
    borderInlineEndWidth: '1q',
    borderInlineStart: '1px solid red',
    borderInlineStartColor: 'primary',
    borderInlineStartStyle: 'solid',
    borderInlineStartWidth: '1q',

    // table
    borderCollapse: 'collapse',
    borderSpacing: '1h',
  });
  expect(style).toEqual({
    // border
    border: '1px solid red',
    borderWidth: '.0625rem',
    borderTopColor: 'red',
    borderTopStyle: 'solid',
    borderTopWidth: '.0625rem',
    borderRightColor: 'red',
    borderRightStyle: 'solid',
    borderRightWidth: '.0625rem',
    borderBottomColor: 'red',
    borderBottomStyle: 'solid',
    borderBottomWidth: '.0625rem',
    borderLeftColor: 'red',
    borderLeftStyle: 'solid',
    borderLeftWidth: '.0625rem',

    // border-radius
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderEndEndRadius: '80px 80px',
    borderEndStartRadius: '80px 80px',
    borderStartEndRadius: '80px 80px',
    borderStartStartRadius: '80px 80px',

    // border-block
    borderBlock: '1px solid red',
    borderBlockColor: 'red',
    borderBlockStyle: 'solid',
    borderBlockWidth: '.0625rem',
    borderBlockEnd: '1px solid red',
    borderBlockEndColor: 'red',
    borderBlockEndStyle: 'solid',
    borderBlockEndWidth: '.0625rem',
    borderBlockStart: '1px solid red',
    borderBlockStartColor: 'red',
    borderBlockStartStyle: 'solid',
    borderBlockStartWidth: '.0625rem',

    // border-image
    borderImage: 'url(border.png) 30 30 round',
    borderImageOutset: '.25rem',
    borderImageRepeat: 'round',
    borderImageSlice: '30%',
    borderImageSource: 'url(border.png)',
    borderImageWidth: '.25rem',

    // border-inline
    borderInline: '1px solid red',
    borderInlineColor: 'red',
    borderInlineStyle: 'solid',
    borderInlineWidth: '.0625rem',
    borderInlineEnd: '1px solid red',
    borderInlineEndColor: 'red',
    borderInlineEndStyle: 'solid',
    borderInlineEndWidth: '.0625rem',
    borderInlineStart: '1px solid red',
    borderInlineStartColor: 'red',
    borderInlineStartStyle: 'solid',
    borderInlineStartWidth: '.0625rem',

    // table
    borderCollapse: 'collapse',
    borderSpacing: '.125rem',
  });
});
