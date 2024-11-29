import tonicTheme from '@tonic-ui/theme';
import { merge } from '@tonic-ui/utils';
import { ensurePlainObject } from 'ensure-type';
import { mapThemeToCSSVariables } from './utils/css-vars';

const defaultCSSVariablePrefix = 'tonic';
const defaultCSSVariableRootSelector = ':root';

const createTheme = (options = {}, ...args) => {
  const {
    // CSS variables configuration for the theme:
    // - false (default): Disables CSS variables.
    // - true: Enables CSS variables with default settings.
    // - Object: Enables CSS variables with custom settings:
    //   - prefix: 'tonic' (default) — Custom prefix for CSS variables.
    //   - rootSelector: ':root' (default) — Root selector where CSS variables are defined.
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
    if (typeof cssVariableConfig !== 'boolean' && typeof cssVariableConfig !== 'object') {
      throw new Error('The `cssVariables` config must be a boolean or an object');
    }

    // Configure the prefix and root selector for CSS variables:
    // - `cssVariablePrefix`: Uses `cssVariables.prefix` if available; otherwise, defaults to 'tonic'.
    // - `rootSelector`: Uses `cssVariables.rootSelector` if available; otherwise, defaults to ':root'.
    const cssVariablePrefix = cssVariableConfig?.prefix ?? defaultCSSVariablePrefix;
    const rootSelector = cssVariableConfig?.rootSelector ?? defaultCSSVariableRootSelector;

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
      cssVariablePrefix,
      cssVariables,
      rootSelector,
    });
  }

  return theme;
};

export default createTheme;
