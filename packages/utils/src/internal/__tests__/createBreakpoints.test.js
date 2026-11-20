import { createBreakpoints } from '../createBreakpoints';

const defaults = createBreakpoints({ values: { lg: 1200, sm: 600, xl: 1536, xs: 0, md: 900 } });

test.each([
  ['gte', ['xs'], '@media (width >= 0px)'],
  ['gte', ['md'], '@media (width >= 900px)'],
  ['lt', ['md'], '@media (width < 900px)'],
  ['lt', ['xs'], '@media (width < 0px)'],
  ['lt', [500], '@media (width < 500px)'],
  ['between', ['sm', 'lg'], '@media (600px <= width < 1200px)'],
  ['between', [600, 800], '@media (600px <= width < 800px)'],
  ['only', ['md'], '@media (900px <= width < 1200px)'],
  ['only', ['xl'], '@media (width >= 1536px)'],
  ['between', [899.95, 900], '@media (899.95px <= width < 900px)'],
  ['lt', [899.96875], '@media (width < 899.96875px)'],
])('%s(%j) produces %s', (method, args, query) => {
  expect(defaults[method](...args)).toBe(query);
});

test('uses the configured unit and orders keys by width', () => {
  const { keys, lt, only } = createBreakpoints({ values: { lg: 80, sm: 40, xs: 0 }, unit: 'em' });
  expect(keys).toEqual(['xs', 'sm', 'lg']);
  expect(lt('sm')).toBe('@media (width < 40em)');
  expect(only('sm')).toBe('@media (40em <= width < 80em)');
});

test('handles nonzero first, singleton and empty scales', () => {
  const sparse = createBreakpoints({ values: { sm: 600, md: 900 } });
  expect(sparse.only('sm')).toBe('@media (600px <= width < 900px)');
  const single = createBreakpoints({ values: { lg: 600 } });
  expect(single.only('lg')).toBe('@media (width >= 600px)');
  expect(createBreakpoints().gte(300)).toBe('@media (width >= 300px)');
  expect(() => createBreakpoints().only('sm')).toThrow(RangeError);
});

test('treats an undefined width as an omitted breakpoint', () => {
  const { keys, values, gte, only } = createBreakpoints({ values: { md: 900, sm: undefined, xs: 0 } });
  expect(keys).toEqual(['xs', 'md']);
  expect(Object.keys(values)).toEqual(['xs', 'md']);
  expect(only('xs')).toBe('@media (0px <= width < 900px)');
  expect(() => gte('sm')).toThrow(RangeError);
});

test('rejects unsupported options and named keys', () => {
  for (const value of [[], null]) {
    expect(() => createBreakpoints(value)).toThrow(new TypeError('[Tonic UI] breakpoints must be an options object.'));
  }
  expect(() => createBreakpoints({ values: { tablet: 600 } })).toThrow(new TypeError('[Tonic UI] Unsupported breakpoint name: tablet.'));
  expect(() => defaults.gte('40em')).toThrow(new RangeError('[Tonic UI] Unknown breakpoint: 40em.'));
});

test('does not expose omitted helper names or step', () => {
  for (const key of ['up', 'down', 'step', 'from', 'below', 'not']) {
    expect(Object.hasOwn(defaults, key)).toBe(false);
  }
});
