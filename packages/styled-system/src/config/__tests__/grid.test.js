import grid from '../grid';

test('returns grid styles', () => {
  const style = grid({
    theme: {
      sizes: {
        '1x': '.25rem',
        '2x': '.5rem',
        '3x': '.75rem',
        '4x': '1rem',
      },
    },

    gridArea: 'auto',
    gridAutoColumns: 'minmax(100px, auto)',
    gridAutoFlow: 'row',
    gridAutoRows: 'minmax(max-content, 2fr)',
    gridColumn: 'auto / auto',
    gridColumnEnd: 'auto',
    gridColumnStart: 'auto',
    gridRow: 'auto / auto',
    gridRowEnd: 'auto',
    gridRowStart: 'auto',
    gridTemplate: `
      "a a a" 20%
      "b b b" auto
    `.trim(),
    gridTemplateAreas: '"a b b" "a c d"',
    gridTemplateColumns: 'minmax(100px, 1fr)',
    gridTemplateRows: 'minmax(100px, 1fr)',

    // deprecated properties
    gridGap: '1x', // `gridGap` is an alias for `gap`
    gridColumnGap: '2x', // `gridColumnGap` is an alias for `columnGap`
    gridRowGap: '4x', // `gridRowGap` is an alias for `rowGap`
  });
  expect(style).toEqual({
    gridArea: 'auto',
    gridAutoColumns: 'minmax(100px, auto)',
    gridAutoFlow: 'row',
    gridAutoRows: 'minmax(max-content, 2fr)',
    gridColumn: 'auto / auto',
    gridColumnEnd: 'auto',
    gridColumnStart: 'auto',
    gridRow: 'auto / auto',
    gridRowEnd: 'auto',
    gridRowStart: 'auto',
    gridTemplate: `
      "a a a" 20%
      "b b b" auto
    `.trim(),
    gridTemplateAreas: '"a b b" "a c d"',
    gridTemplateColumns: 'minmax(100px, 1fr)',
    gridTemplateRows: 'minmax(100px, 1fr)',

    // deprecated properties
    gridGap: '.25rem',
    gridColumnGap: '.5rem',
    gridRowGap: '1rem',
  });
});
