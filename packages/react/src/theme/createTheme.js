import { merge } from '@tonic-ui/utils';
import { ensurePlainObject } from 'ensure-type';
import createCSSVariableMap from './utils/createCSSVariableMap';

const defaultCSSVariablePrefix = 'tonic';

const cssVariableScales = [
  'borders',
  'breakpoints',
  'colors',
  'fonts',
  'fontSizes',
  'fontWeights',
  'letterSpacings',
  'lineHeights',
  'outlines',
  'radii',
  'shadows',
  'sizes',
  'space',
  'zIndices',
];

const createTheme = (options, ...args) => {
  // Merge provided options with default configurations
  let theme = merge(options, {
    config: {
      prefix: defaultCSSVariablePrefix,
      useCSSVariables: false,
    },
  });

  // Ensure the components field is initialized
  theme.components = theme.components ?? {};

  // Merge additional arguments into the theme
  theme = args.reduce((acc, arg) => merge(acc, arg), theme);

  // Generate a theme object filtered to include only scales supported by CSS variables
  const cssVariableTheme = Object.fromEntries(
    Object.entries(ensurePlainObject(theme)).filter(
      ([key]) => cssVariableScales.includes(key)
    )
  );

  // Create a map of CSS variables with the appropriate prefix
  const cssVariableMap = createCSSVariableMap(cssVariableTheme, { prefix: theme?.config?.prefix });

  // Merge the CSS variable map into the theme
  theme = merge(theme, {
    __cssVariableMap: cssVariableMap,
  });

  return theme;
};

export default createTheme;
