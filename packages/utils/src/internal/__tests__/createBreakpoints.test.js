import { createBreakpoints } from '../createBreakpoints';

const defaults = createBreakpoints({ values: { lg: 64, sm: 40, '2xl': 96, xl: 80, md: 48, xs: 0 }, unit: 'rem' });

test.each([
  ['gte', ['sm'], '@media (width >= 40rem)'],
  ['gte', ['md'], '@media (width >= 48rem)'],
  ['lt', ['md'], '@media (width < 48rem)'],
  ['lt', ['sm'], '@media (width < 40rem)'],
  ['lt', ['32rem'], '@media (width < 32rem)'],
  ['between', ['sm', 'lg'], '@media (40rem <= width < 64rem)'],
  ['between', ['36rem', '44rem'], '@media (36rem <= width < 44rem)'],
  ['only', ['md'], '@media (48rem <= width < 64rem)'],
  ['only', ['2xl'], '@media (width >= 96rem)'],
  ['between', ['47.95rem', '48rem'], '@media (47.95rem <= width < 48rem)'],
  ['lt', ['47.96875rem'], '@media (width < 47.96875rem)'],
  ['gte', ['40em'], '@media (width >= 40em)'],
  ['gte', ['0px'], '@media (width >= 0px)'],
  ['gte', ['xs'], '@media (width >= 0rem)'],
  ['only', ['xs'], '@media (0rem <= width < 40rem)'],
  ['gte', [0], '@media (width >= 0)'],
  ['lt', [0], '@media (width < 0)'],
  ['between', [0, 'md'], '@media (0 <= width < 48rem)'],
  ['between', ['sm', 0], '@media (40rem <= width < 0)'],
  ['lt', ['.5px'], '@media (width < .5px)'],
  ['between', ['sm', '960px'], '@media (40rem <= width < 960px)'],
  ['between', ['800px', '40rem'], '@media (800px <= width < 40rem)'],
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
  expect(createBreakpoints().gte('300px')).toBe('@media (width >= 300px)');
  expect(() => createBreakpoints().only('sm')).toThrow(RangeError);
  expect(() => sparse.gte('2xl')).toThrow(RangeError);
  expect(() => sparse.only('2xl')).toThrow(RangeError);
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
  expect(() => createBreakpoints().gte('xs')).toThrow(new RangeError('[Tonic UI] Unknown breakpoint: xs.'));
});

test.each([
  48, '0', '48', { value: 48, unit: 'rem' }, null, '', '-1px', '+1px', ' 48px', '48px ', '48px\n',
  '1e2px', '48PX', '48vw', 'calc(1px + 1px)', '@media (width >= 48px)', `${'9'.repeat(309)}px`,
])('rejects invalid query boundaries: %p', (value) => {
  expect(() => defaults.gte(value)).toThrow(TypeError);
  expect(() => defaults.lt(value)).toThrow(TypeError);
  expect(() => defaults.between(value, 'md')).toThrow(TypeError);
  expect(() => defaults.between('sm', value)).toThrow(TypeError);
});

test.each([0, 48, '48', '14rem'])('only rejects non-name input: %p', (value) => {
  expect(() => defaults.only(value)).toThrow(TypeError);
});

test('does not expose omitted helper names or step', () => {
  for (const key of ['up', 'down', 'step', 'from', 'below', 'not']) {
    expect(Object.hasOwn(defaults, key)).toBe(false);
  }
});
