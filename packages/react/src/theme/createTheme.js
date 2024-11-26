import tonicTheme from '@tonic-ui/theme';
import { merge } from '@tonic-ui/utils';
import { ensurePlainObject } from 'ensure-type';
import { mapThemeToCSSVariables } from './utils/css-vars';

const defaultCSSVariablePrefix = 'tonic';

const createTheme = (options = {}, ...args) => {
  const {
    // Configure CSS variables for the theme:
    // - `false` (default): Disable CSS variables.
    // - `true`: Enable CSS variables with default settings.
    // - `{ prefix: 'tonic' }`: Enable CSS variables with a custom prefix.
    cssVariables: cssVariableConfig = false,
    ...rest
  } = options;

  let theme = merge(
    {
      ...tonicTheme,
    },
    rest,
  );

  // Merge additional arguments into the theme
  theme = args.reduce((acc, arg) => merge(acc, arg), theme);

  if (cssVariableConfig) {
    // Determine the prefix for CSS variables:
    // - Uses the `prefix` property if provided (e.g., `createTheme({ cssVariables: { prefix: 'tonic' } })`).
    // - Defaults to `defaultCSSVariablePrefix` if no custom prefix is specified.
    const cssVariablePrefix = cssVariableConfig?.prefix ?? defaultCSSVariablePrefix;

    // Generate a theme object filtered to include only scales supported by CSS variables
    const cssVariableScales = Object.keys(tonicTheme);
    const cssVariableTheme = Object.fromEntries(
      Object.entries(ensurePlainObject(theme)).filter(
        ([key]) => cssVariableScales.includes(key)
      )
    );

    // Create CSS variables with the appropriate prefix
    const cssVariables = mapThemeToCSSVariables(cssVariableTheme, { prefix: cssVariablePrefix });

    // Merge CSS variables into the theme
    theme = merge(theme, {
      vars: {
        prefix: cssVariablePrefix,
        ...cssVariables,
      },
    });
  }

  return theme;
};

export default createTheme;
