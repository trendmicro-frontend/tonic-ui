import { toCSSVariable } from '@tonic-ui/utils/internal';
import { ensureString } from 'ensure-type';

/**
 * Recursively processes theme object and converts _dark/_light structure to variables
 */
const processColorModeTokens = (obj, path = '', prefix = '') => {
  const result = {};

  for (const [key, value] of Object.entries(obj)) {
    const currentPath = path ? `${path}.${key}` : key;

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      // Check if it's a _dark/_light structure (must have both _dark and _light properties)
      if (Object.prototype.hasOwnProperty.call(value, '_dark') && Object.prototype.hasOwnProperty.call(value, '_light')) {
        // Generate variables with -dark/-light suffixes
        result[`${currentPath}-dark`] = value._dark;
        result[`${currentPath}-light`] = value._light;
        // Also generate base variable that defaults to light mode
        const baseVarName = toCSSVariable(`${currentPath}-light`, { prefix });
        result[currentPath] = `var(${baseVarName})`;
      } else if (Object.prototype.hasOwnProperty.call(value, 'main')) {
        // Primitive color object with a `main` default and lighten/darken variants.
        // Example input:  red.600 = { main: '#dd1128', lighten: { 80: '#e02439', ... }, darken: { 80: '#cf1025', ... } }
        // Generated vars: --tonic-colors-red-600-main:       #dd1128
        //                 --tonic-colors-red-600-lighten-80:  #e02439
        //                 --tonic-colors-red-600-darken-80:   #cf1025
        //                 --tonic-colors-red-600:             var(--tonic-colors-red-600-main)  ← alias
        const nestedResults = processColorModeTokens(value, currentPath, prefix);
        Object.assign(result, nestedResults);
        const mainVarName = toCSSVariable(`${currentPath}.main`, { prefix }); // --tonic-colors-red-600: var(--tonic-colors-red-600-main)
        result[currentPath] = `var(${mainVarName})`;
      } else {
        // Recursively process nested objects (not a complete _dark/_light structure)
        const nestedResults = processColorModeTokens(value, currentPath, prefix);
        Object.assign(result, nestedResults);
      }
    } else {
      // Regular value, assign directly
      result[currentPath] = value;
    }
  }

  return result;
};

/**
 * Generates CSS variables from a theme object.
 *
 * @param {{ [key: string]: * }} theme - The theme object containing key-value pairs for the variables.
 * @param {{ prefix?: string }} [options] - Optional configuration for variable generation.
 * @param {string} [options.prefix] - A prefix to prepend to each generated CSS variable.
 *
 * @example
 * ```js
 * const theme = {
 *   colors: {
 *     'blue:50': '#578aef',
 *   },
 * };
 * mapThemeToCSSVariables(theme, { prefix: 'tonic' });
 * // => {
 * //   '--tonic-colors-blue-50': '#578aef'
 * // }
 * ```
 */
export const mapThemeToCSSVariables = (theme, options) => {
  const prefix = ensureString(options?.prefix);

  // Process _dark/_light structure and generate base variables
  const processedTokens = processColorModeTokens(theme, '', prefix);
  const cssVariables = {};

  for (const [name, value] of Object.entries(processedTokens)) {
    if (!name) {
      // Skip if name is empty
      continue;
    }

    const variable = toCSSVariable(name, { prefix });
    cssVariables[variable] = value;
  }

  return cssVariables;
};
