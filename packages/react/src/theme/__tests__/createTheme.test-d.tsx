import { createTheme } from '@tonic-ui/react';

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
