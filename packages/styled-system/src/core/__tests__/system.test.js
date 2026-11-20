import { createBreakpoints } from '@tonic-ui/utils/internal';
import system from '../system';

const defaultBreakpoints = createBreakpoints({
  values: { sm: 40, md: 52, lg: 64 },
  unit: 'em',
});

test('returns a style parser', () => {
  const parser = system({
    color: true,
    backgroundColor: {
      property: 'backgroundColor',
      scale: 'colors',
    },
    mx: {
      scale: 'space',
      properties: ['marginLeft', 'marginRight'],
    },
  });
  expect(typeof parser).toBe('function');
  const styles = parser({
    theme: {
      breakpoints: defaultBreakpoints,
      space: [0, 4, 8, 16, 32],
      colors: {
        primary: 'rebeccapurple',
      },
    },
    color: 'tomato',
    backgroundColor: 'primary',
    mx: { _: 2, sm: 3, md: 4 },
  });
  expect(styles).toEqual({
    color: 'tomato',
    backgroundColor: 'rebeccapurple',
    marginLeft: 8,
    marginRight: 8,
    '@media (width >= 40em)': {
      marginLeft: 16,
      marginRight: 16,
    },
    '@media (width >= 52em)': {
      marginLeft: 32,
      marginRight: 32,
    },
  });
});

test('merges responsive styles even when breakpoint keys are out of order', () => {
  const parser = system({
    margin: true,
    padding: true,
    width: true,
  });
  const styles = parser({
    theme: {
      breakpoints: defaultBreakpoints,
    },
    margin: { md: 8, _: 0, sm: 4 },
    padding: { _: 16, sm: 32, md: 64 },
    width: { _: '100%', sm: '50%' },
  });
  expect(styles).toEqual({
    margin: 0,
    padding: 16,
    width: '100%',
    '@media (width >= 40em)': {
      margin: 4,
      padding: 32,
      width: '50%',
    },
    '@media (width >= 52em)': {
      margin: 8,
      padding: 64,
    },
  });
});

test('merges multiple responsive object styles', () => {
  const parser = system({
    margin: true,
    padding: true,
    width: true,
  });
  const styles = parser({
    theme: {
      breakpoints: defaultBreakpoints,
    },
    margin: { _: 0, sm: 4, md: 8 },
    padding: { _: 16, sm: 32, md: 64 },
    width: { _: '100%', sm: '50%' },
  });
  expect(styles).toEqual({
    margin: 0,
    padding: 16,
    width: '100%',
    '@media (width >= 40em)': {
      margin: 4,
      padding: 32,
      width: '50%',
    },
    '@media (width >= 52em)': {
      margin: 8,
      padding: 64,
    },
  });
});

test('gets values from theme', () => {
  const parser = system({
    mx: {
      properties: ['marginLeft', 'marginRight'],
      scale: 'space',
    },
    color: {
      property: 'color',
      scale: 'colors',
    },
  });
  const style = parser({
    theme: {
      breakpoints: defaultBreakpoints,
      colors: {
        primary: 'tomato',
      },
      space: [0, 6, 12, 24, 48, 96],
    },
    mx: { _: 0, sm: 1, md: 2, lg: 3 },
    color: { _: 'primary', sm: 'black' },
  });
  expect(style).toEqual({
    color: 'tomato',
    marginLeft: 0,
    marginRight: 0,
    '@media (width >= 40em)': {
      color: 'black',
      marginLeft: 6,
      marginRight: 6,
    },
    '@media (width >= 52em)': {
      marginLeft: 12,
      marginRight: 12,
    },
    '@media (width >= 64em)': {
      marginLeft: 24,
      marginRight: 24,
    },
  });
});

test('gets 0 index values from theme', () => {
  const parser = system({
    width: {
      property: 'width',
      scale: 'sizes',
    }
  });
  const style = parser({
    theme: {
      breakpoints: defaultBreakpoints,
      sizes: [24, 48],
    },
    width: 0,
  });
  expect(style).toEqual({ width: 24 });
});

test('ignores null values', () => {
  const parser = system({
    color: true,
  });
  const style = parser({ color: null });
  expect(style).toEqual({});
});

test('returns a noop function with no arguments', () => {
  const parser = system();
  expect(typeof parser).toBe('function');
});

test('skips nullish values in breakpoint objects', () => {
  const parser = system({
    fontSize: {
      property: 'fontSize',
      scale: 'fontSizes',
    },
  });
  const style = parser({
    theme: {
      breakpoints: defaultBreakpoints,
    },
    fontSize: { _: 16, sm: null, md: undefined, lg: 18 },
  });
  expect(style).toEqual({
    fontSize: 16,
    '@media (width >= 64em)': {
      fontSize: 18,
    }
  });
});

test('includes single property functions', () => {
  const parser = system({
    color: true,
    backgroundColor: true,
    width: true,
  });
  const a = parser.color({ color: 'tomato', backgroundColor: 'nope' });
  const b = parser.width({ width: '100%', color: 'tomato', backgroundColor: 'nope' });
  expect(a).toEqual({ color: 'tomato' });
  expect(b).toEqual({ width: '100%' });
});

test('parser configs can be composed manually', () => {
  const color = system({ color: true, backgroundColor: true });
  const layout = system({ width: true, height: true });
  const composed = system({ ...color.config, ...layout.config });
  const style = composed({
    color: 'tomato',
    backgroundColor: 'black',
    width: '100%',
  });
  expect(style).toEqual({
    color: 'tomato',
    backgroundColor: 'black',
    width: '100%',
  });
});

test('supports custom named breakpoint objects', () => {
  const parser = system({
    margin: true,
    padding: true,
    width: true,
  });
  const styles = parser({
    theme: {
      disableStyledSystemCache: true,
      breakpoints: createBreakpoints({
        values: { sm: 32, md: 40, lg: 64 },
        unit: 'em',
      }),
    },
    margin: { _: 0, sm: 4, md: 8 },
    padding: { _: 16, lg: 64 },
  });
  expect(styles).toEqual({
    margin: 0,
    padding: 16,
    '@media (width >= 32em)': {
      margin: 4,
    },
    '@media (width >= 40em)': {
      margin: 8,
    },
    '@media (width >= 64em)': {
      padding: 64,
    },
  });
});

test('sorts media queries when responsive object values are used', () => {
  const parser = system({
    margin: true,
    padding: true,
    color: true,
  });
  const styles = parser({
    theme: {
      disableStyledSystemCache: true,
      breakpoints: createBreakpoints({
        values: { sm: 10.125, md: 10.5, lg: 64, xl: 128 },
        unit: 'em',
      }),
    },
    padding: { _: 16, xl: 128, lg: 64 },
    margin: { md: 8, sm: 4 },
    color: { lg: 'tomato' },
  });
  expect(Object.keys(styles)).toEqual([
    'padding',
    '@media (width >= 10.125em)',
    '@media (width >= 10.5em)',
    '@media (width >= 64em)',
    '@media (width >= 128em)',
  ]);
});

test('sorts responsive objects and treats zero and unknown keys correctly', () => {
  const parser = system({ margin: true, padding: true, color: true });
  const breakpoints = createBreakpoints({
    values: { sm: 0, md: 600, lg: 900 },
    unit: 'px',
  });
  const styles = parser({
    theme: { breakpoints },
    margin: { lg: 4, sm: 1, _: 0, xs: 999, '2xl': 999, typo: 999, 0: 999 },
    padding: { _: 4, sm: 1, md: 2, lg: 3 },
    color: { xs: 'red', '2xl': 'red', typo: 'blue' },
  });

  expect(styles).toEqual({
    margin: 0,
    padding: 4,
    '@media (width >= 0px)': { margin: 1, padding: 1 },
    '@media (width >= 600px)': { padding: 2 },
    '@media (width >= 900px)': { margin: 4, padding: 3 },
  });
  expect(Object.keys(styles)).toEqual([
    'margin',
    'padding',
    '@media (width >= 0px)',
    '@media (width >= 600px)',
    '@media (width >= 900px)',
  ]);
});

test('transforms values', () => {
  const parser = system({
    margin: {
      property: 'margin',
      transform: (scale, n, options) => {
        const m = options.props.multiply || 1;
        return m * n;
      }
    }
  });
  const a = parser({ margin: 8 });
  const b = parser({ margin: 12, multiply: 2 });
  expect(a).toEqual({ margin: 8 });
  expect(b).toEqual({ margin: 24 });
});
