import { createBreakpoints } from '../createBreakpoints';

const defaults = createBreakpoints({ values: { lg: 1200, sm: 600, xl: 1536, xs: 0, md: 900 } });

test.each([
  ['up', ['xs'], '@media (min-width:0px)'],
  ['up', ['md'], '@media (min-width:900px)'],
  ['down', ['md'], '@media (max-width:899.95px)'],
  ['down', ['xs'], '@media (max-width:-0.05px)'],
  ['down', [500], '@media (max-width:499.95px)'],
  ['between', ['sm', 'lg'], '@media (min-width:600px) and (max-width:1199.95px)'],
  ['between', [600, 800], '@media (min-width:600px) and (max-width:799.95px)'],
  ['only', ['md'], '@media (min-width:900px) and (max-width:1199.95px)'],
  ['only', ['xl'], '@media (min-width:1536px)'],
  ['not', ['md'], '@media not all and (min-width:900px) and (max-width:1199.95px)'],
  ['not', ['xs'], '@media (min-width:600px)'],
  ['not', ['xl'], '@media (max-width:1535.95px)'],
])('%s(%j) produces %s', (method, args, query) => {
  expect(defaults[method](...args)).toBe(query);
});

test('uses configured units and step and orders keys by width', () => {
  const { keys, down, only } = createBreakpoints({ values: { lg: 80, sm: 40, xs: 0 }, unit: 'em', step: 10 });
  expect(keys).toEqual(['xs', 'sm', 'lg']);
  expect(down('sm')).toBe('@media (max-width:39.9em)');
  expect(only('sm')).toBe('@media (min-width:40em) and (max-width:79.9em)');
});

test('handles nonzero first, singleton and empty scales', () => {
  expect(createBreakpoints({ values: { sm: 600, md: 900 } }).not('sm')).toBe('@media (min-width:900px)');
  const single = createBreakpoints({ values: { lg: 600 } });
  expect(single.only('lg')).toBe('@media (min-width:600px)');
  expect(single.not('lg')).toBe('@media (max-width:599.95px)');
  expect(createBreakpoints().up(300)).toBe('@media (min-width:300px)');
  expect(() => createBreakpoints().only('sm')).toThrow(RangeError);
});

test('treats an undefined width as an omitted breakpoint', () => {
  const { keys, values, up, only } = createBreakpoints({ values: { md: 900, sm: undefined, xs: 0 } });
  expect(keys).toEqual(['xs', 'md']);
  expect(Object.keys(values)).toEqual(['xs', 'md']);
  expect(only('xs')).toBe('@media (min-width:0px) and (max-width:899.95px)');
  expect(() => up('sm')).toThrow(RangeError);
});

test('rejects unsupported options and named keys', () => {
  for (const value of [[], null]) {
    expect(() => createBreakpoints(value)).toThrow(new TypeError('[Tonic UI] breakpoints must be an options object.'));
  }
  expect(() => createBreakpoints({ values: { tablet: 600 } })).toThrow(new TypeError('[Tonic UI] Unsupported breakpoint name: tablet.'));
  expect(() => defaults.up('40em')).toThrow(new RangeError('[Tonic UI] Unknown breakpoint: 40em.'));
});
