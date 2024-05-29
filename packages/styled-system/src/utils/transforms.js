import get from './get';
import toCSSVariable from './toCSSVariable';

const isSimpleCSSVariable = (x) => {
  const re = /^var\(\s*([a-zA-Z0-9\-_]+)\s*\)$/;
  return re.test(String(x ?? '').trim());
};

export const getter = (scale, value, options) => {
  const prefix = options?.props?.theme?.config?.prefix; // defaults to 'tonic'
  const useCSSVariables = !!(options?.props?.theme?.config?.useCSSVariables); // defaults to false
  const cssVariableMap = options?.props?.theme?.__cssVariableMap;
  const result = get(scale, value);

  if (result !== undefined && useCSSVariables) {
    const contextScale = options?.context?.scale;
    const cssVariable = toCSSVariable(
      // Examples:
      // => contextScale='colors', value='blue:50'
      // => contextScale='space', value=0
      [contextScale, String(value ?? '')].filter(Boolean).join('.'), // => 'colors.blue:50'
      { prefix, delimiter: '-' },
    ); // => '--tonic-colors-blue-50'
    const cssVariableValue = cssVariableMap?.[cssVariable]; // => '#578aef'
    if (cssVariableValue !== undefined) {
      const resultString = String(result ?? '');
      // e.g. Replace '#578aef' with 'var(--tonic-colors-blue-50)'
      return resultString.replaceAll(cssVariableValue, `var(${cssVariable})`);
    }
    // fallback to the original value
  }

  return result ?? value; // fallback to value if result is null or undefined
};

export const positiveOrNegative = (scale, value, options) => {
  const useCSSVariables = !!(options?.props?.theme?.config?.useCSSVariables); // defaults to false

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
    const absoluteValue = (value.startsWith('+') || value.startsWith('-')) ? value.slice(1) : value;
    const isNonNegative = !value.startsWith('-');

    // Return the result if the value is non-negative or if the scale object does not contain the absolute value
    if (isNonNegative || !Object.prototype.hasOwnProperty.call(scale, absoluteValue)) {
      return getter(scale, value, options);
    }

    const n = getter(scale, absoluteValue, options);

    // Handle CSS variables for negative values
    if (useCSSVariables && isSimpleCSSVariable(n)) {
      // https://stackoverflow.com/questions/49469344/using-negative-css-custom-properties
      return `calc(0 - ${n})`;
    }

    // Handle numeric value
    if (typeof n === 'number' && Number.isFinite(value)) {
      return n * -1;
    }

    return `-${n}`;
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
    const absoluteValue = Math.abs(value);
    const isNonNegative = !(value < 0);

    // Return the result if the value is non-negative or if the scale object does not contain the absolute value
    if (isNonNegative || !Object.prototype.hasOwnProperty.call(scale, absoluteValue)) {
      return getter(scale, value, options);
    }

    const n = getter(scale, absoluteValue, options);

    // Handle CSS variables for negative values
    if (useCSSVariables && isSimpleCSSVariable(n)) {
      // https://stackoverflow.com/questions/49469344/using-negative-css-custom-properties
      return `calc(0 - ${n})`;
    }

    // Handle numeric value
    if (typeof n === 'number' && Number.isFinite(value)) {
      return n * -1;
    }

    return `-${n}`;
  }

  return getter(scale, value, options);
};
