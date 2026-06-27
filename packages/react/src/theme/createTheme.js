import tonicTheme from '@tonic-ui/theme';
import { merge, resolveTheme } from '@tonic-ui/utils';
import { ensurePlainObject } from 'ensure-type';
import { mapThemeToCSSVariables } from './utils/css-vars';
import { TONIC_THEME } from './constants';

const defaultCSSVariablePrefix = 'tonic';
const defaultCSSVariableRootSelector = ':root';

/**
 * @typedef {Object} CSSVariableConfig
 * @property {string} [prefix='tonic'] - Custom prefix for CSS variables.
 * @property {string} [rootSelector=':root'] - Root selector where CSS variables are defined.
 */

/**
 * @typedef {Object} CreateThemeOptions
 * @property {boolean | CSSVariableConfig} [cssVariables=false] - CSS variables configuration. `false` (default) disables CSS variables; `true` enables them with default settings; an object enables them with custom `prefix` and `rootSelector`.
 */

/**
 * Creates a theme object, optionally generating CSS variables.
 *
 * @param {CreateThemeOptions & ThemeScales} [options={}] - Theme configuration options.
 * @param {...ThemeScales} args - Additional theme objects to merge.
 * @returns {ThemeScales & { cssVariablePrefix?: string, cssVariables?: ThemeScales, rootSelector?: string }} The created theme object. When CSS variables are enabled, `cssVariablePrefix`, `cssVariables`, and `rootSelector` are attached.
 */
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

  // Resolve token references (e.g., {colors.primary} → actual value).
  // Over flat v3 colon tokens (gray:100) there are no {refs} to resolve, so this
  // is a near pass-through that simply attaches toColorMode() to the theme.
  theme = resolveTheme(theme);

  // TONIC_THEME is a non-enumerable property used to identify themes created with `createTheme()`.
  Object.defineProperty(theme, TONIC_THEME, { value: true, enumerable: false });

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

    // Create CSS variables with the appropriate prefix.
    // Frozen so the shared map cannot be mutated by consumers.
    const cssVariables = Object.freeze(mapThemeToCSSVariables(cssVariableTheme, { prefix: cssVariablePrefix }));

    // All the following properties must be enumerable to remain accessible in `styled-system`
    // and `CSSVariables` after theme propagation. The Proxy variants in resolveTheme delegate
    // missing properties back to this resolved object, so attaching here is sufficient.
    Object.defineProperties(theme, {
      cssVariablePrefix: { value: cssVariablePrefix, enumerable: true, configurable: true },
      cssVariables: { value: cssVariables, enumerable: true, configurable: true },
      rootSelector: { value: rootSelector, enumerable: true, configurable: true },
    });
  }

  return theme;
};

export default createTheme;
