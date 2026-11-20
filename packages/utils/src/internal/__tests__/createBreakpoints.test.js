import { createBreakpoints } from '../createBreakpoints';

const defaults = createBreakpoints({ values: { lg: 64, sm: 40, '2xl': 96, xl: 80, md: 48 }, unit: 'rem' });

test.each([
  ['gte', ['sm'], '@media (width >= 40rem)'],
  ['gte', ['md'], '@media (width >= 48rem)'],
  ['lt', ['md'], '@media (width < 48rem)'],
  ['lt', ['sm'], '@media (width < 40rem)'],
  ['lt', [32], '@media (width < 32rem)'],
  ['between', ['sm', 'lg'], '@media (40rem <= width < 64rem)'],
  ['between', [36, 44], '@media (36rem <= width < 44rem)'],
  ['only', ['md'], '@media (48rem <= width < 64rem)'],
  ['only', ['2xl'], '@media (width >= 96rem)'],
  ['between', [47.95, 48], '@media (47.95rem <= width < 48rem)'],
  ['lt', [47.96875], '@media (width < 47.96875rem)'],
])('%s(%j) produces %s', (method, args, query) => {
  expect(defaults[method](...args)).toBe(query);
});

test('uses the configured unit and orders keys by width', () => {
  const { keys, lt, only } = createBreakpoints({ values: { lg: 80, md: 40, sm: 0 }, unit: 'em' });
  expect(keys).toEqual(['sm', 'md', 'lg']);
  expect(lt('md')).toBe('@media (width < 40em)');
  expect(only('md')).toBe('@media (40em <= width < 80em)');
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
  const { keys, values, gte, only } = createBreakpoints({ values: { lg: 900, md: undefined, sm: 0 } });
  expect(keys).toEqual(['sm', 'lg']);
  expect(Object.keys(values)).toEqual(['sm', 'lg']);
  expect(only('sm')).toBe('@media (0px <= width < 900px)');
  expect(() => gte('md')).toThrow(RangeError);
});

test('rejects unsupported options and named keys', () => {
  for (const value of [[], null]) {
    expect(() => createBreakpoints(value)).toThrow(new TypeError('[Tonic UI] breakpoints must be an options object.'));
  }
  expect(() => createBreakpoints({ values: { tablet: 600 } })).toThrow(new TypeError('[Tonic UI] Unsupported breakpoint name: tablet.'));
  expect(() => createBreakpoints({ values: { xs: 0 } })).toThrow(new TypeError('[Tonic UI] Unsupported breakpoint name: xs.'));
  expect(() => defaults.gte('xs')).toThrow(new RangeError('[Tonic UI] Unknown breakpoint: xs.'));
  expect(() => defaults.gte('40em')).toThrow(new RangeError('[Tonic UI] Unknown breakpoint: 40em.'));
});

test('does not expose omitted helper names or step', () => {
  for (const key of ['up', 'down', 'step', 'from', 'below', 'not']) {
    expect(Object.hasOwn(defaults, key)).toBe(false);
  }
});
