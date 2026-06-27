import { toCSSVariable } from '@tonic-ui/utils';
import { get, isNullish } from '@tonic-ui/utils';

// Legacy toCSSVariable matching the original tonic-ui behavior:
// replaces ALL non-alphanumeric, non-hyphen, non-underscore characters with hyphens.
// Used only in the backward-compat path to preserve byte-identical output for v3 flat tokens.
const toCSSVariableLegacy = (name, options) => {
  const {
    prefix = '',
    delimiter = '-',
  } = { ...options };
  const variableName = ([prefix, name].filter(Boolean).join(delimiter))
    .replace(/\s+/g, delimiter)
    .replace(/[^a-zA-Z0-9-_]/g, delimiter)
    .replace(/^-+|-+$/g, '');
  return `--${variableName}`;
};

const getter = (scale, value, options) => {
  let result = get(scale, value);

  if (result === undefined) {
    return value; // fallback to value if result is undefined
  }
  // Gate-keeper: an object is only resolvable if it carries at least one of the
  // four recognized properties that the resolver below knows how to extract:
  //   _dark / _light  — semantic color-mode pair
  //   main            — color-mode-neutral primitive default
  //   value           — single-value token
  // Anything else (e.g. a plain nested object like { foo: 'bar' }) falls back to
  // the original path string to avoid silently returning undefined.
  if (typeof result === 'object') {
    const isNonCompatibleObject = ['_dark', '_light', 'main', 'value'].every((k) => isNullish(result[k]));
    if (isNonCompatibleObject) {
      return value; // fallback to value if result is a non-compatible object
    }
  }

  const theme = options?.props?.theme;

  // Priority 1: Check if `useCSSVariables` is enabled (new tonic-one semantic path)
  //
  // This path handles _dark/_light token objects and emits var(--…) references.
  // It is gated on theme.useCSSVariables (injected by ThemeProvider/TonicProvider)
  // and is DORMANT by default until useCSSVariables is explicitly set to true.
  if (theme?.useCSSVariables) {
    const cssVariablePrefix = theme?.cssVariablePrefix;
    const cssVariables = theme?.cssVariables;
    const contextScale = options?.context?.scale;
    const cssVariable = toCSSVariable(
      // | contextScale | value                   |
      // | ------------ | ----------------------- |
      // | colors       | 'text.normal.primary'   |
      // | space        | 0                       |
      [contextScale, String(value ?? '')].filter(Boolean).join('.'), // => 'colors.text.normal.primary'
      { prefix: cssVariablePrefix, delimiter: '-' },
    ); // => '--tonic-colors-text-normal-primary'

    const cssVariableValue = cssVariables?.[cssVariable]; // => '#578aef' or 'var(--tonic-colors-gray-60-light)'

    if (cssVariableValue !== undefined) {
      // If cssVariableValue is already a CSS variable reference, return the CSS variable directly
      if (typeof cssVariableValue === 'string' && cssVariableValue.startsWith('var(--')) {
        return `var(${cssVariable})`;
      }
      // Otherwise, replace the value with the CSS variable reference
      // For _dark/_light objects, we need to extract the actual value first
      let actualValue = result;
      if (typeof result === 'object' && (result?._dark !== undefined || result?._light !== undefined)) {
        // In CSS Variables mode, we use the light value as reference for replacement
        actualValue = result._light ?? result._dark;
      } else if (typeof result === 'object') {
        actualValue = result?.value;
      }
      return String(actualValue ?? '').replaceAll(cssVariableValue, `var(${cssVariable})`);
    }
    // fallback to processing below
  }

  // Priority 2: Extract the `value` property or handle _dark/_light tokens
  //
  // Handle token objects (for non-CSS Variables mode):
  // - If either _dark or _light is defined, resolves using props.__colorMode (injected from ColorModeContext
  //   via Box wrapper), falling back to 'light' if not available.
  // - Otherwise, falls back to `main` (color-mode-neutral default) or `value`.
  //
  // Example usage:
  // ```
  // <Box color="text.normal.primary" />
  // ```
  //
  // The `colors` scale in the theme with color mode tokens:
  // ```js
  // {
  //   colors: {
  //     text: {
  //       normal: {
  //         primary: {
  //           _dark: 'rgba(255, 255, 255, .92)',
  //           _light: 'rgba(0, 0, 0, .92)',
  //         },
  //       },
  //     },
  //   },
  // }
  // ```
  //
  // Or with the `main` property as the color-mode-neutral default and `_dark`/`_light` as overrides:
  // ```js
  // {
  //   colors: {
  //     red: {
  //       600: {
  //         main: '#dd1128',  // default value — color mode is not a factor
  //         'L80': '#e02439',
  //         'D80': '#cf1025',
  //       },
  //     },
  //   },
  // }
  // ```
  //
  // Or with the `value` property as a fallback if `main` is not provided:
  // ```js
  // {
  //   colors: {
  //     white: {
  //       primary: {
  //         value: 'rgba(255, 255, 255, .92)',
  //       },
  //     },
  //   },
  // }
  // ```
  // Resolver: extract the scalar value from a compatible object.
  // By this point the gate-keeper above has already confirmed at least one
  // recognized property is present, so this block will always produce a value.
  if (typeof result === 'object') {
    // Handle _dark/_light color mode tokens (for non-CSS Variables mode)
    if (result?._dark !== undefined || result?._light !== undefined) {
      // Resolve color mode: props.__colorMode (from ColorModeContext) or default to 'light'
      const colorMode = options?.props?.__colorMode ?? 'light';
      result = (colorMode === 'dark') ? result._dark : result._light;
    } else {
      // `main` — color-mode-neutral primitive default (e.g. red.600.main)
      // `value` — single-value token fallback
      result = result?.main ?? result?.value;
    }
  }

  // Backward-compat CSS variable substitution path (tonic-ui v3 flat tokens):
  // When theme.cssVariables is present but useCSSVariables was not explicitly set,
  // preserve the original tonic-ui behavior of substituting raw values with var(--…).
  // This path is ONLY reached for non-object results (flat scalar tokens).
  // FIXME: `theme.config.prefix` and `theme.__cssVariableMap` are deprecated and will be removed in the next major release
  if (!theme?.useCSSVariables) {
    const hasCSSVariables = !!(theme?.cssVariables ?? theme?.__cssVariableMap);
    if (hasCSSVariables) {
      const cssVariablePrefix = (theme?.cssVariablePrefix) ?? (theme?.config?.prefix);
      const cssVariables = (theme?.cssVariables) ?? (theme?.__cssVariableMap);
      const contextScale = options?.context?.scale;
      const cssVariable = toCSSVariableLegacy(
        [contextScale, String(value ?? '')].filter(Boolean).join('.'),
        { prefix: cssVariablePrefix, delimiter: '-' },
      );
      const cssVariableValue = cssVariables?.[cssVariable];
      if (cssVariableValue !== undefined) {
        return String(result ?? '').replaceAll(cssVariableValue, `var(${cssVariable})`);
      }
    }
  }

  return result;
};

export default getter;
