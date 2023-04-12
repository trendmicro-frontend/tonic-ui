import get from './get';

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

export const getter = (scale, value, options) => {
  const { context, props } = { ...options };
  const theme = props?.theme;

  // sx.scale = 'colors'
  // value = 'blue:50'
  const cssVariable = toCSSVariable(
    [context?.scale, value].filter(Boolean).join('.'), // => 'colors.blue:50'
    { prefix: theme?.config?.prefix, delimiter: '-' }, // prefix = 'tonic'
  ); // => '--tonic-colors-blue-50'
  const cssVariableValue = theme?.__cssVariables?.[cssVariable];

  const result = get(scale, value, value);

  if ((result !== undefined) && (cssVariableValue !== undefined)) {
    return String(result ?? '').replaceAll(cssVariableValue, `var(${cssVariable})`);
  }

  return result;
};

export const outline = (scale, value, options) => {
  const isNoneOrZero = value === 'none' || value === '0' || value === 0;
  if (isNoneOrZero) {
    return {
      outline: '2px solid transparent',
      outlineOffset: '2px',
    };
  }

  return {
    outline: getter(scale, value, options),
    outlineOffset: 'unset',
  };
};

export const positiveOrNegative = (scale, value, options) => {
  /**
   * Scale object
   *
   * ```js
   * {
   *   '1x': '0.25rem',
   *   '2x': 8,
   * }
   * ```
   *
   * Example
   *
   * ```jsx
   * <Box margin="1x" />
   * // => margin: 0.25rem
   * <Box margin="2x" />
   * // => margin: 8px
   * <Box margin="-1x" />
   * // => margin: -0.25rem
   * <Box margin="-2x" />
   * // => margin: -8px
   * ```
   */
  if (typeof value === 'string') {
    const isNegative = value.startsWith('-');
    if (!isNegative) {
      return getter(scale, value, options);
    }
    const absoluteValue = (value.startsWith('+') || value.startsWith('-')) ? value.slice(1) : value;
    const n = getter(scale, absoluteValue, options);
    if (typeof n === 'string') {
      return `calc(${n} * -1)`;
    }
    return n * -1;
  }

  /**
   * Scale object
   *
   * ```js
   * {
   *   4: '0.25rem',
   *   8: 8,
   * }
   * ```
   *
   * Example
   *
   * ```jsx
   * <Box margin={4} />
   * // => margin: 0.25rem
   * <Box margin={8} />
   * // => margin: 8px
   * <Box margin={-4} />
   * // => margin: -0.25rem
   * <Box margin={-8} />
   * // => margin: -8px
   * ```
   */
  if (typeof value === 'number' && Number.isFinite(value)) {
    const isNegative = (value < 0);
    if (!isNegative) {
      return getter(scale, value, options);
    }
    const absoluteValue = Math.abs(value);
    const n = getter(scale, absoluteValue, options);
    if (typeof n === 'string') {
      return `calc(${n} * -1)`;
    }
    return n * -1;
  }

  return getter(scale, value, options);
};
