import { ensureString } from 'ensure-type';
import flatten from './flatten';
import toCSSVariable from './toCSSVariable';

/**
 * Generate CSS variable map for a given theme object.
 *
 * @param {object} theme - The object containing the theme values.
 * @param {object} [options] - The options object.
 * @param {string} [options.prefix] - A prefix to prepend to each generated CSS variable.
 *
 * @example
 * ```js
 * const theme = {
 *   colors: {
 *     'blue:50': '#578aef',
 *   },
 * };
 * createCSSVariableMap(theme, { prefix: 'tonic' });
 * // => {
 * //   '--tonic-colors-blue-50': '#578aef'
 * // }
 * ```
 */
const createCSSVariableMap = (theme, options) => {
  const prefix = ensureString(options?.prefix);
  const tokens = flatten(theme);
  const cssVariableMap = {};

  for (const [name, value] of Object.entries(tokens)) {
    // name='colors.blue:50', prefix='tonic'
    // => '--tonic-colors-blue-50'
    const variable = toCSSVariable(name, { prefix });
    cssVariableMap[variable] = value;
  }

  return cssVariableMap;
};

export default createCSSVariableMap;
