import { createBreakpoints } from '@tonic-ui/utils/internal';
import system from '../system';

const defaultBreakpoints = createBreakpoints({
  values: { sm: 40, md: 52, lg: 64 },
  unit: 'em',
});

const theme = {
  breakpoints: defaultBreakpoints,
  colors: {
    primary: 'rebeccapurple',
    secondary: 'papayawhip',
  },
  fontSizes: [0, 4, 8, 16],
};

const parser = system({
  color: {
    property: 'color',
    scale: 'colors',
  },
  fontSize: {
    property: 'fontSize',
    scale: 'fontSizes',
  },
});

test('uses the current breakpoint scale when providers alternate', () => {
  const alternateBreakpoints = createBreakpoints({
    values: { sm: 11, md: 22, lg: 33 },
    unit: 'em',
  });

  for (const [breakpoints, widths] of [
    [defaultBreakpoints, [40, 52, 64]],
    [alternateBreakpoints, [11, 22, 33]],
    [defaultBreakpoints, [40, 52, 64]],
  ]) {
    const styles = parser({
      theme: { ...theme, breakpoints },
      fontSize: [1, 2, 3, 3],
      color: ['primary', null, 'secondary'],
    });

    expect(styles).toEqual({
      color: 'rebeccapurple',
      fontSize: 4,
      [`@media (min-width:${widths[0]}em)`]: { fontSize: 8 },
      [`@media (min-width:${widths[1]}em)`]: {
        fontSize: 16,
        color: 'papayawhip',
      },
      [`@media (min-width:${widths[2]}em)`]: { fontSize: 16 },
    });
  }
});

test('reuses a cached media list only for the same breakpoint object', () => {
  parser({ theme, fontSize: [1, 2] });
  const cachedMedia = parser.cache.media;

  parser({ theme, color: ['primary', 'secondary'] });
  expect(parser.cache.breakpoints).toBe(defaultBreakpoints);
  expect(parser.cache.media).toBe(cachedMedia);
});

test('disabled caching uses local breakpoints without changing the cache', () => {
  parser({ theme, fontSize: [1, 2] });
  const cachedMedia = parser.cache.media;
  const uncachedBreakpoints = createBreakpoints({
    values: { sm: 7, md: 8, lg: 9 },
    unit: 'em',
  });

  const styles = parser({
    theme: { ...theme, breakpoints: uncachedBreakpoints, disableStyledSystemCache: true },
    fontSize: [1, 2, 3, 3],
    color: ['primary', null, 'secondary'],
  });

  expect(styles).toEqual({
    color: 'rebeccapurple',
    fontSize: 4,
    '@media (min-width:7em)': { fontSize: 8 },
    '@media (min-width:8em)': { fontSize: 16, color: 'papayawhip' },
    '@media (min-width:9em)': { fontSize: 16 },
  });
  expect(parser.cache.breakpoints).toBe(defaultBreakpoints);
  expect(parser.cache.media).toBe(cachedMedia);
  expect(parser({ theme, fontSize: [1, 2, 3, 3] })).toEqual({
    fontSize: 4,
    '@media (min-width:40em)': { fontSize: 8 },
    '@media (min-width:52em)': { fontSize: 16 },
    '@media (min-width:64em)': { fontSize: 16 },
  });
  expect(parser.cache.media).toBe(cachedMedia);
});

test('disabled caching does not read a cached list for the same breakpoint object', () => {
  const freshParser = system({ color: true });
  freshParser({ theme, color: ['red', 'blue'] });
  const cachedMedia = freshParser.cache.media;
  cachedMedia[1] = '@media stale';

  expect(freshParser({
    theme: { ...theme, disableStyledSystemCache: true },
    color: ['red', 'blue'],
  })).toEqual({
    color: 'red',
    '@media (min-width:40em)': { color: 'blue' },
  });
  expect(freshParser.cache.media).toBe(cachedMedia);
  expect(cachedMedia[1]).toBe('@media stale');
});

test('does not create a media list without a responsive value', () => {
  const freshParser = system({ color: true });

  expect(freshParser({ color: 'red' })).toEqual({ color: 'red' });
  expect(freshParser({ color: null })).toEqual({});
  expect(freshParser.cache).toEqual({});
});

test('without a theme only renders unconditional responsive values', () => {
  const freshParser = system({ color: true });

  expect(freshParser({ color: ['red', 'blue'] })).toEqual({ color: 'red' });
  expect(freshParser({ color: { _: 'red', sm: 'blue' } })).toEqual({ color: 'red' });
});
