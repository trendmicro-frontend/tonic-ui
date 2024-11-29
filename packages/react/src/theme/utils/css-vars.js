import { ensureString } from 'ensure-type';
import flatten from './flatten';

/**
 * Returns a CSS variable name formatted from the given name and options.
 *
 * @param {string} name - The name of the variable.
 * @param {object} [options] - The options object.
 * @param {string} [options.prefix=''] - The prefix to use for the variable name.
 * @param {string} [options.delimiter='-'] - The delimiter to use between the prefix and name.
 *
 * @return {string} The CSS variable name.
*/
export const toCSSVariable = (name, options) => {
  const {
    prefix = '',
    delimiter = '-',
  } = { ...options };
  const variableName = ([prefix, name].filter(Boolean).join(delimiter))
    .replace(/\s+/g, delimiter) // replace whitespace characters
    .replace(/[^a-zA-Z0-9-_]/g, delimiter) // replace non-alphanumeric, non-hyphen, non-underscore characters
    .replace(/^-+|-+$/g, ''); // trim hyphens from beginning and end of string
  return `--${variableName}`;
};

/**
 * Generates CSS variables from a theme object.
 *
 * @param {object} theme - The theme object containing key-value pairs for the variables.
 * @param {object} [options] - Optional configuration for variable generation.
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
  const tokens = flatten(theme);
  const cssVariables = {};

  for (const [name, value] of Object.entries(tokens)) {
    // name='colors.blue:50', prefix='tonic'
    // => '--tonic-colors-blue-50'
    if (!name) {
      // Skip if name is empty
      continue;
    }
    const variable = toCSSVariable(name, { prefix });
    cssVariables[variable] = value;
  }

  return cssVariables;
};
