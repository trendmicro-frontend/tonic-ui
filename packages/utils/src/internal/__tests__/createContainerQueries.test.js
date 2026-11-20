import { createBreakpoints } from '../createBreakpoints';
import { createContainerQueries } from '../createContainerQueries';

const breakpoints = createBreakpoints({ values: { sm: 40, md: 48, lg: 64, xl: 80, '2xl': 96 }, unit: 'rem' });
const queries = createContainerQueries(breakpoints);

it.each([
  ['gte', ['sm'], '(width >= 40rem)'],
  ['lt', ['md'], '(width < 48rem)'],
  ['between', ['sm', 'lg'], '(40rem <= width < 64rem)'],
  ['only', ['md'], '(48rem <= width < 64rem)'],
  ['gte', [18.75], '(width >= 18.75rem)'],
  ['lt', [20], '(width < 20rem)'],
  ['between', [18.75, 24], '(18.75rem <= width < 24rem)'],
])('adapts %s %j for unnamed and named containers', (method, args, condition) => {
  expect(queries[method](...args)).toBe(`@container ${condition}`);
  expect(queries('sidebar')[method](...args)).toBe(`@container sidebar ${condition}`);
});

it('keeps each container context independent and preserves authored names', () => {
  const sidebar = queries('SideBar');
  const card = queries('card');
  expect(sidebar.gte('sm')).toBe('@container SideBar (width >= 40rem)');
  expect(card.lt('sm')).toBe('@container card (width < 40rem)');
  expect(queries.between('sm', 'md')).toBe('@container (40rem <= width < 48rem)');
  expect(sidebar.only('2xl')).toBe('@container SideBar (width >= 96rem)');
  expect(queries('').gte('sm')).toBe('@container (width >= 40rem)');
  expect(queries(undefined).gte('sm')).toBe('@container (width >= 40rem)');
});

it('inherits units and validation from the active breakpoint scale', () => {
  const custom = createContainerQueries(createBreakpoints({ values: { sm: 40, md: 60 }, unit: 'em' }));
  expect(custom('sidebar').only('sm')).toBe('@container sidebar (40em <= width < 60em)');
  expect(custom.lt(50)).toBe('@container (width < 50em)');
  const px = createContainerQueries(createBreakpoints({ values: { lg: 600 }, unit: 'px' }));
  expect(px.only('lg')).toBe('@container (width >= 600px)');
  expect(px('sidebar').between(300, 'lg')).toBe('@container sidebar (300px <= width < 600px)');
  const empty = createContainerQueries(createBreakpoints());
  expect(empty.gte(300)).toBe('@container (width >= 300px)');
  expect(() => empty.only('sm')).toThrow(RangeError);
  expect(() => custom.gte('300px')).toThrow(RangeError);
  expect(() => custom('sidebar').gte('mobile')).toThrow(RangeError);
  expect(() => custom.only(300)).toThrow(RangeError);
});
