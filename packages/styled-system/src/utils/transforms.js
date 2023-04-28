import get from './get';
import toCSSVariable from './toCSSVariable';

export const getter = (scale, value, options) => {
  const { context, props } = { ...options };
  const prefix = props?.theme?.config?.prefix; // defaults to 'tonic'
  const useCSSVariables = props?.theme?.config?.useCSSVariables; // defaults to false
  const cssVariableMap = props?.theme?.__cssVariableMap;

  const result = get(scale, value, value);

  if (result === undefined) {
    return result;
  }

  if (useCSSVariables) {
    const contextScale = context?.scale;
    const cssVariable = toCSSVariable(
      // contextScale='colors', value='blue:50'
      [contextScale, value].filter(Boolean).join('.'), // => 'colors.blue:50'
      { prefix, delimiter: '-' },
    ); // => '--tonic-colors-blue-50'
    const cssVariableValue = cssVariableMap[cssVariable];

    if (cssVariableValue !== undefined) {
      const resultString = String(result ?? '');
      return resultString.replaceAll(cssVariableValue, `var(${cssVariable})`);
    }
    // fallback to the original value
  }

  return result;
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
