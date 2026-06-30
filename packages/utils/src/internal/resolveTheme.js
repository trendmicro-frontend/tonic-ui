import { isPlainObject } from '../assertion';
import { get } from '../shared';

/**
 * Resolve token references in any value.
 *
 * Handles single references (`{red.600}`), cross-domain references
 * (`{colors.red.600}`), inline references in strings
 * (`color-mix(in srgb, {colors.red.600} 24%, transparent)`), and
 * `_dark`/`_light` mode pairs — preserving the pair structure while
 * resolving the references inside.
 *
 * When a reference resolves to a plain object with a `main` property
 * (e.g. a primitive color like `{ main: '#dd1128', lighten: { ... } }`),
 * the `main` value is extracted automatically so that string references
 * always resolve to a scalar.
 *
 * @param {any} value - Value that may contain token references like {red.600}
 * @param {Object} allTokens - Complete token object for reference resolution
 * @param {string} [currentDomain=''] - Current domain being processed (e.g., 'colors', 'spacing')
 * @returns {any} - Value with resolved references
 */
function resolveTokenReferences(value, allTokens, currentDomain = '') {
  // First try the current domain for performance, fallback to global scope for cross-domain references
  const domainTheme = allTokens[currentDomain];
  const globalTheme = allTokens;

  // Recursive resolution function
  const resolveValue = (value, visited = new Set()) => {
    if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
      const tokenPath = value.slice(1, -1);

      // Handle empty token references
      if (tokenPath === '') {
        return value;
      }

      if (visited.has(tokenPath)) {
        return value;
      }

      visited.add(tokenPath);

      // First try to resolve in current domain for performance
      let resolvedValue = domainTheme ? get(domainTheme, tokenPath) : undefined;

      // If not found and we have a domain theme, try global scope for cross-domain references
      if (resolvedValue === undefined && domainTheme) {
        resolvedValue = get(globalTheme, tokenPath);
      }

      // If still not found and no domain theme, use global scope
      if (resolvedValue === undefined && !domainTheme) {
        resolvedValue = get(globalTheme, tokenPath);
      }

      // Final fallback: try to resolve with currentDomain prefix for cross-domain references
      if (resolvedValue === undefined && currentDomain) {
        const domainPrefixedPath = `${currentDomain}.${tokenPath}`;
        resolvedValue = get(globalTheme, domainPrefixedPath);
      }

      // If still not found and no domain theme, use global scope
      if (resolvedValue === undefined && !domainTheme) {
        resolvedValue = get(globalTheme, tokenPath);
      }

      if (resolvedValue !== undefined) {
        let finalValue = resolveValue(resolvedValue, visited);

        // If the reference resolved to a primitive color object with a `main` default value
        // (e.g. {red.600} → { main: '#dd1128', L80: '#e02439', ... }), extract the main
        // value so that string references always resolve to a scalar color string.
        if (isPlainObject(finalValue)) {
          finalValue = finalValue.main ?? finalValue;
        }

        // Remove from visited only after complete resolution
        visited.delete(tokenPath);

        return finalValue;
      }

      // Remove from visited if resolution failed
      visited.delete(tokenPath);
      return value;
    }

    // Handle strings with multiple token references (like color-mix syntax)
    if (typeof value === 'string' && value.includes('{')) {
      let result = value;
      const tokenPattern = /\{[^}]+\}/g;
      const matches = value.match(tokenPattern);

      if (matches) {
        for (const match of matches) {
          const resolvedToken = resolveValue(match, visited);
          if (resolvedToken !== match) {
            result = result.replace(match, resolvedToken);
          }
        }
      }

      return result;
    }

    if (isPlainObject(value)) {
      // Handle _dark/_light objects: resolve the token references inside them but preserve the structure
      if (value._dark !== undefined || value._light !== undefined) {
        const resolved = {};
        for (const [key, val] of Object.entries(value)) {
          // Resolve token references inside _dark/_light values
          const resolvedVal = resolveValue(val, visited);

          // Special handling: if we're resolving a reference that returns another _dark/_light object,
          // extract the appropriate value for the current key instead of creating nested structure
          if (isPlainObject(resolvedVal) &&
            (resolvedVal._dark !== undefined || resolvedVal._light !== undefined)) {
            resolved[key] = resolvedVal[key] !== undefined ? resolvedVal[key] : resolvedVal._dark || resolvedVal._light;
          } else {
            resolved[key] = resolvedVal;
          }
        }
        return resolved;
      }

      // Process other objects recursively
      const resolved = {};
      for (const [key, val] of Object.entries(value)) {
        resolved[key] = resolveValue(val, visited);
      }
      return resolved;
    }

    return value;
  };

  return resolveValue(value);
}

/**
 * Resolves `_dark`/`_light` tokens in a theme based on the current color mode,
 * then attaches a `get(path, defaultValue)` helper for convenient token access.
 */
function applyColorMode(theme, colorMode) {
  function resolveTokenValue(value) {
    // Only descend into plain objects. Non-plain objects (DOM nodes, React refs,
    // class instances) may be present in the theme (e.g. `containerRef` in a
    // component's `defaultProps`) and can hold circular references, which would
    // otherwise cause infinite recursion. They are leaves and returned as-is.
    if (isPlainObject(value)) {
      if (value._dark !== undefined || value._light !== undefined) {
        const selectedValue = colorMode === 'dark' ? value._dark : value._light;
        if (selectedValue !== undefined) {
          return resolveTokenValue(selectedValue);
        }
        const fallbackValue = value._light !== undefined ? value._light : value._dark;
        return fallbackValue !== undefined ? resolveTokenValue(fallbackValue) : value;
      }
      const resolved = {};
      for (const [key, val] of Object.entries(value)) {
        resolved[key] = resolveTokenValue(val);
      }
      return resolved;
    }
    return value;
  }

  const colorModeTheme = resolveTokenValue(theme);

  Object.defineProperty(colorModeTheme, 'get', {
    /**
     * Retrieves a value from the theme by path, automatically extracting `main`
     * from nested primitive color objects (e.g. `red.600` → `{ main: '#dd1128', ... }` → `'#dd1128'`).
     *
     * @param {string} path - Dot-separated path to the theme value (e.g. 'colors.red.600', 'sizes.4x').
     * @param {any} [defaultValue] - Fallback value if the path is not found.
     * @returns {any} The resolved theme value.
     */
    value: (path, defaultValue) => {
      let value = get(colorModeTheme, path, defaultValue);
      if (isPlainObject(value) && value.main) {
        value = value.main;
      }
      return value;
    },
    enumerable: false,
  });

  return colorModeTheme;
}

/**
 * @typedef {Object} ColorModeTheme
 * @property {function(string, any=): any} get - Retrieves a value by path, extracting `main` from primitive color objects.
 */

/**
 * @typedef {Object} ResolvedTheme
 * @property {function('light'|'dark'=): ColorModeTheme} toColorMode - Returns the theme resolved for the given color mode.
 */

/**
 * Resolves all `{...}` token references in a theme object and attaches a
 * `toColorMode(colorMode)` method for resolving `_dark`/`_light` tokens on demand.
 *
 * @param {Record<string, unknown>} theme - The theme object to resolve.
 * @returns {ResolvedTheme} - A new theme object with all token references resolved.
 */
export function resolveTheme(theme) {
  const resolved = {};
  for (const domain of Object.keys(theme)) {
    resolved[domain] = resolveTokenReferences(theme[domain], theme, domain);
  }

  // Pre-build both color-mode variants so toColorMode() is only a cache lookup.
  // Each variant uses a Proxy to delegate missing properties back to the base theme,
  // including properties added later by createTheme(), such as `cssVariables`,
  // `cssVariablePrefix`, and `rootSelector`.
  // A Proxy is used instead of a prototype link so the variant remains a plain object,
  // preserving the `isPlainObject` checks used by `get()` and styled-system.
  const proxyVariant = (variant) => new Proxy(variant, {
    get(target, key, receiver) {
      return Reflect.has(target, key) ? Reflect.get(target, key, receiver) : resolved[key];
    },
  });
  const colorModeCache = {
    light: proxyVariant(applyColorMode(resolved, 'light')),
    dark: proxyVariant(applyColorMode(resolved, 'dark')),
  };

  Object.defineProperty(resolved, 'toColorMode', {
    value: (colorMode = 'light') => colorModeCache[colorMode],
    enumerable: true, // Must be enumerable to remain accessible in `useTheme()` after theme propagation.
  });

  return resolved;
}
