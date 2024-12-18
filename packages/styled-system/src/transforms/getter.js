import get from '../utils/get';

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
const toCSSVariable = (name, options) => {
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

const getter = (scale, value, options) => {
  let result = get(scale, value);

  // Extract the `value` property if the result is an object.
  //
  // Example usage:
  // ```
  // <Box color="white.primary" />
  // <Box color="black.primary" />
  // ```
  //
  // The `colors` scale in the theme:
  // ```js
  // {
  //   colors: {
  //     white: {
  //       primary: {
  //         value: 'rgba(255, 255, 255, .92)',
  //       },
  //       secondary: {
  //         value: 'rgba(255, 255, 255, .60)',
  //       },
  //     },
  //     black: {
  //       primary: {
  //         value: 'rgba(0, 0, 0, .92)',
  //       },
  //       secondary: {
  //         value: 'rgba(0, 0, 0, .65)',
  //       },
  //     },
  //   },
  // }
  // ```
  if (typeof result === 'object') {
    result = result?.value;
  }

  if (result === undefined) {
    return value; // fallback to value if result is undefined
  }

  const theme = options?.props?.theme;
  // FIXME: `theme.config.prefix` and `theme.__cssVariableMap` are deprecated and will be removed in the next major release
  const hasCSSVariables = !!(theme?.cssVariables ?? theme?.__cssVariableMap);
  if (hasCSSVariables) {
    const cssVariablePrefix = (theme?.cssVariablePrefix) ?? (theme?.config?.prefix);
    const cssVariables = (theme?.cssVariables) ?? (theme?.__cssVariableMap);
    const contextScale = options?.context?.scale;
    const cssVariable = toCSSVariable(
      // | contextScale | value     |
      // | ------------ | --------- |
      // | colors       | 'blue:50' |
      // | space        | 0         |
      [contextScale, String(value ?? '')].filter(Boolean).join('.'), // => 'colors.blue:50'
      { prefix: cssVariablePrefix, delimiter: '-' },
    ); // => '--tonic-colors-blue-50'
    const cssVariableValue = cssVariables?.[cssVariable]; // => '#578aef'
    if (cssVariableValue !== undefined) {
      // => Replace '#578aef' with 'var(--tonic-colors-blue-50)'
      return String(result ?? '').replaceAll(cssVariableValue, `var(${cssVariable})`);
    }
    // fallback to the original result
  }

  return result;
};

export default getter;
