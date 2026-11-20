import { createTheme } from '@tonic-ui/react';

const viewportTheme = createTheme();
const viewportQuery: string = viewportTheme.breakpoints.only('md');
const directContainerQuery: string = viewportTheme.containerQueries.gte('sm');
const namedContainerQuery: string = viewportTheme.containerQueries('sidebar').only('md');
createTheme({ breakpoints: { values: { sm: 0, md: 48 }, unit: 'em' } });
createTheme(viewportTheme, { breakpoints: { values: { lg: 1000 }, unit: 'px' } });
// @ts-expect-error There is no named base breakpoint.
createTheme({ breakpoints: { values: { xs: 0 } } });
// @ts-expect-error Unknown breakpoint name.
createTheme({ breakpoints: { values: { tablet: 640 } } });
// @ts-expect-error Legacy array config is not accepted.
createTheme({ breakpoints: ['600px'] });
const largestQuery: string = viewportTheme.breakpoints.gte('2xl');
// @ts-expect-error There is no named base breakpoint.
viewportTheme.breakpoints.gte('xs');
const minWidth: string = viewportTheme.breakpoints.gte('md');
const exclusiveMaxWidth: string = viewportTheme.breakpoints.lt(48);
// @ts-expect-error The previous helper name is not accepted.
viewportTheme.breakpoints.up('md');
// @ts-expect-error The previous helper name is not accepted.
viewportTheme.breakpoints.down('md');
// @ts-expect-error Strict range queries do not use a step option.
createTheme({ breakpoints: { step: 5 } });
// @ts-expect-error only() accepts a key, not a width.
viewportTheme.breakpoints.only(600);
// @ts-expect-error Cannot replace the breakpoint snapshot.
viewportTheme.breakpoints = createTheme().breakpoints;
// @ts-expect-error Cannot mutate a width in the snapshot.
viewportTheme.breakpoints.values.md = 1000;

// Basic usage
const myTheme = createTheme({
  colors: {
    primary: 'blue',
  },
});

// No arguments
const defaultTheme = createTheme();

// Empty options
const emptyTheme = createTheme({});

// With cssVariables config
const themedWithCSS = createTheme({
  cssVariables: {
    prefix: 'app',
    rootSelector: '#root',
  },
});

// With custom theme scales
const customScales = createTheme({
  colors: {
    brand: { 50: '#e3f2fd', 100: '#bbdefb' },
  },
  fontSizes: {
    xs: '0.75rem',
  },
  space: {
    '1x': '0.25rem',
  },
});

// Multiple theme objects merged
const mergedTheme = createTheme(
  { colors: { primary: 'blue' } },
  { colors: { secondary: 'green' } },
  { fontSizes: { lg: '1.25rem' } },
);

// Access return value properties
const theme = createTheme({});
const prefix = theme.cssVariablePrefix;
const rootSel = theme.rootSelector;
