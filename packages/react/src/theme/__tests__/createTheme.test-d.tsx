import { createTheme } from '@tonic-ui/react';
import standalonePreset from '@tonic-ui/theme';

const viewportTheme = createTheme();
const viewportQuery: string = viewportTheme.breakpoints.only('md');
const directContainerQuery: string = viewportTheme.containerQueries.gte('sm');
const namedContainerQuery: string = viewportTheme.containerQueries('sidebar').only('md');
createTheme({ breakpoints: { values: { sm: 0, md: 48 }, unit: 'em' } });
createTheme(viewportTheme, { breakpoints: { values: { lg: 1000 }, unit: 'px' } });
createTheme({ breakpoints: { values: { xs: 0 } } });
const deviceTheme = createTheme(viewportTheme, { breakpoints: { values: { mobile: 0, tablet: 640 } } });
deviceTheme.breakpoints.gte('tablet');
deviceTheme.containerQueries('sidebar').between('mobile', 'tablet');
// @ts-expect-error A replacement scale does not include the default names.
deviceTheme.breakpoints.gte('sm');
// @ts-expect-error Container queries use the same inferred names.
deviceTheme.containerQueries.only('talbet');
const sparseTheme = createTheme({ breakpoints: { values: { mobile: 0, tablet: undefined } } });
sparseTheme.breakpoints.gte('mobile');
// @ts-expect-error Undefined widths omit the breakpoint.
sparseTheme.breakpoints.gte('tablet');
// @ts-expect-error Legacy array config is not accepted.
createTheme({ breakpoints: ['600px'] });
const largestQuery: string = viewportTheme.breakpoints.gte('2xl');
const minWidth: string = viewportTheme.breakpoints.gte('md');
const exclusiveMaxWidth: string = viewportTheme.breakpoints.lt('48rem');
const zeroWidth: string = viewportTheme.breakpoints.gte('xs');
const explicitZeroWidth: string = viewportTheme.breakpoints.gte(0);
// @ts-expect-error Numeric boundaries need an explicit unit.
viewportTheme.breakpoints.gte(48);
// @ts-expect-error A unitless string is not a breakpoint name or length.
viewportTheme.breakpoints.lt('0');
// @ts-expect-error A length must be a string, not an object.
viewportTheme.breakpoints.between('sm', { value: 48, unit: 'rem' });
// @ts-expect-error The previous helper name is not accepted.
viewportTheme.breakpoints.up('md');
// @ts-expect-error The previous helper name is not accepted.
viewportTheme.breakpoints.down('md');
// @ts-expect-error Strict range queries do not use a step option.
createTheme({ breakpoints: { step: 5 } });
// @ts-expect-error only() accepts a key, not a width.
viewportTheme.breakpoints.only('600px');
// @ts-expect-error only() accepts a key, not numeric zero.
viewportTheme.breakpoints.only(0);
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

// @ts-expect-error Query bindings are immutable.
viewportTheme.containerQueries = viewportTheme.containerQueries; // eslint-disable-line no-self-assign -- Deliberate type-contract negative test.
// @ts-expect-error Standalone presets lock the same query binding.
standalonePreset.containerQueries = standalonePreset.containerQueries; // eslint-disable-line no-self-assign -- Deliberate type-contract negative test.
