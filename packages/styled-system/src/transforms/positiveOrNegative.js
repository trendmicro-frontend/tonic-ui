import { isNullish } from '@tonic-ui/utils';
import getter from './getter';

const hasOwnSafe = (obj, key) => {
  if (isNullish(obj)) {
    return false;
  }

  return Object.hasOwn
    ? Object.hasOwn(obj, key)
    : Object.prototype.hasOwnProperty.call(obj, key);
};

// Check if a value is a simple CSS variable
// e.g. var(--tonic-spacing-1)
const isSimpleCSSVariable = (value) => {
  const re = /^var\(\s*([a-zA-Z0-9\-_]+)\s*\)$/;
  return re.test(String(value ?? '').trim());
};

// Negate the value, handling CSS variables and numeric values
const toNegativeValue = (scale, absoluteValue, options) => {
  const theme = options?.props?.theme;
  const n = getter(scale, absoluteValue, options);

  // Handle CSS variables for negative values
  if (!!theme?.cssVariables && isSimpleCSSVariable(n)) {
    // https://stackoverflow.com/questions/49469344/using-negative-css-custom-properties
    return `calc(0px - ${n})`;
  }

  // Handle numeric value
  if (typeof n === 'number' && Number.isFinite(n)) {
    return n * -1;
  }

  return `-${n}`;
};

const positiveOrNegative = (scale, value, options) => {
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

    // Return the result if the scale object does not contain the absolute value
    if (!hasOwnSafe(scale, absoluteValue)) {
      return getter(scale, value, options);
    }

    // Return the result if the value is non-negative
    if (isNonNegative) {
      return getter(scale, value, options);
    }

    return toNegativeValue(scale, absoluteValue, options);
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

    // Return the result if the scale object does not contain the absolute value
    if (!hasOwnSafe(scale, absoluteValue)) {
      return getter(scale, value, options);
    }

    // Return the result if the value is non-negative
    if (isNonNegative) {
      return getter(scale, value, options);
    }

    return toNegativeValue(scale, absoluteValue, options);
  }

  return getter(scale, value, options);
};

export default positiveOrNegative;
