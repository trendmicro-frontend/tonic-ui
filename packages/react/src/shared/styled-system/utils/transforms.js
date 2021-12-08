import get from './get';

export const border = (value, scale, props) => {
  const borderStyle = get(scale, value);
  if (borderStyle) {
    return borderStyle;
  }

  // `border="1x"` is a shorthand for `border=".25rem solid"` (or `border="4px solid"`)
  const borderWidth = get(props?.theme?.sizes, value);
  if (borderWidth !== undefined) {
    return Number.isFinite(borderWidth)
      ? `${borderWidth}px solid`
      : `${borderWidth} solid`;
  }

  // `border={1}` is a shorthand for `border="1px solid"`
  if (Number.isFinite(value)) {
    return `${value}px solid`;
  }

  return value;
};

export const outline = (value, scale, props) => {
  const outlineStyle = get(scale, value);
  if (outlineStyle) {
    return outlineStyle;
  }

  // `outline="1x"` is a shorthand for `outline=".25rem solid"` (or `outline="4px solid"`)
  const outlineWidth = get(props?.theme?.sizes, value);
  if (outlineWidth !== undefined) {
    return Number.isFinite(outlineWidth)
      ? `${outlineWidth}px solid`
      : `${outlineWidth} solid`;
  }

  // `outline={1}` is a shorthand for `outline="1px solid"`
  if (Number.isFinite(value)) {
    return `${value}px solid`;
  }

  return value;
};

export const positiveOrNegative = (value, scale, props) => {
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
      return get(scale, value, value);
    }
    const absoluteValue = (value.startsWith('+') || value.startsWith('-')) ? value.slice(1) : value;
    const n = get(scale, absoluteValue, absoluteValue);
    if (typeof n === 'string') {
      return `-${n}`;
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
      return get(scale, value, value);
    }
    const absoluteValue = Math.abs(value);
    const n = get(scale, absoluteValue, absoluteValue);
    if (typeof n === 'string') {
      return `-${n}`;
    }
    return n * -1;
  }

  return get(scale, value, value);
};
