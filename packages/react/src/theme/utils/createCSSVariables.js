import defaultTheme from '@tonic-ui/theme';
import { ensureString } from 'ensure-type';
import flatten from './flatten';

const defaultThemeScales = Object.keys(defaultTheme);

/**
 * Generate CSS variables for a given theme object.
 *
 * @param {object} theme - The object containing the theme values.
 * @param {object} [options] - The options object.
 * @param {string} [options.prefix] - A prefix to prepend to each generated CSS variable.
 *
 * @return {object} An object containing the following properties:
 * - {object} cssMap An object that maps each original token name to its corresponding CSS variable and reference.
 * - {object} cssVariables An object that maps each CSS variable to its corresponding value.
 *
 * @example
 * ```js
 * const theme = {
 *   colors: {
 *     'blue:50': '#578aef',
 *   },
 * };
 * const options = { prefix: 'tonic' };
 * createCSSVariables(theme, options);
 * // => {
 * //   '--tonic-colors-blue-50': '#578aef'
 * // }
 * ```
 */
const createCSSVariables = (originalTheme, options) => {
  const cssVariables = {};

  const tokens = (() => {
    const _theme = {};
    defaultThemeScales.forEach((scale) => {
      if (Object.prototype.hasOwnProperty.call(originalTheme, scale)) {
        _theme[scale] = originalTheme[scale];
      }
    });
    return flatten(_theme);
  })();

  const transform = (name) => {
    const variableName = ([options?.prefix, name].filter(Boolean).join('-'))
      .replace(/\s+/g, '-') // replace whitespace characters
      .replace(/[^a-zA-Z0-9-_]/g, '-') // replace non-alphanumeric, non-hyphen, non-underscore characters
      .replace(/^-+|-+$/g, ''); // trim hyphens from beginning and end of string
    return `--${variableName}`;
  };

  for (const [name, value] of Object.entries(tokens)) {
    const variable = transform(ensureString(name));
    cssVariables[variable] = value;
  }

  return cssVariables;
};

export default createCSSVariables;
