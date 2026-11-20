import { createBreakpoints } from '@tonic-ui/utils/internal';
import system from '../../system';
import grid from '../grid';

test('returns grid styles', () => {
  const style = grid({
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
  });
});

test('resolves legacy grid gap style props, including responsive size tokens', () => {
  const style = system({
    theme: {
      breakpoints: createBreakpoints({ values: { sm: 600 } }),
      sizes: { '2x': '.5rem', '3x': '.75rem', '4x': '1rem' },
    },
    gridGap: '2x',
    gridRowGap: { _: '3x', sm: '4x' },
    gridColumnGap: '12px',
  });
  expect(style).toEqual({
    gridGap: '.5rem',
    gridRowGap: '.75rem',
    gridColumnGap: '12px',
    '@media (width >= 600px)': { gridRowGap: '1rem' },
  });
});

test('rejects responsive arrays in the composed system parser', () => {
  const parse = () => system({ gridGap: ['2x', '4x'] });
  expect(parse).toThrow(TypeError);
  expect(parse).toThrow('Responsive array values are not supported for style prop "gridGap".');
});
