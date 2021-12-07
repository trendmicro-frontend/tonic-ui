import { get } from '@styled-system/core';

export const border = (value, scale, props) => {
  const borderStyle = get(scale, value);
  if (borderStyle) {
    return borderStyle;
  }

  // `border="1x"` is a shorthand for `border=".25rem solid"` (or `border="4px solid"`)
  const borderWidth = get(props?.theme?.borderWidths, value);
  if (borderWidth !== undefined) {
    return `${borderWidth} solid`;
  }

  // `border={1}` is a shorthand for `border="1px solid"`
  if (Number.isFinite(value)) {
    return `${value}px solid`;
  }

  return value;
};

export const borderWidth = (value, scale, props) => {
  const borderWidth = get(scale, value);
  if (borderWidth !== undefined) {
    return borderWidth;
  }

  // `borderWidth={1}` is a shorthand for `borderWidth="1px"`
  if (Number.isFinite(value)) {
    return `${value}px`;
  }

  return value;
};

export const margin = (value, scale, props) => {
  if (typeof value === 'string') {
    const isNegative = value.startsWith('-');
    const absoluteValue = isNegative ? value.slice(1) : value;
    const valueFromScale = get(scale, absoluteValue);
    if (valueFromScale !== undefined) {
      return isNegative ? `-${valueFromScale}` : valueFromScale;
    }
    return value;
  }

  if (Number.isFinite(value)) {
    const isNegative = value < 0;
    const absoluteValue = Math.abs(value);
    const valueFromScale = get(scale, absoluteValue, absoluteValue);
    if (!Number.isFinite(valueFromScale)) {
      return isNegative ? `-${valueFromScale}` : valueFromScale;
    }
    return valueFromScale * (isNegative ? -1 : 1);
  }

  return value;
};
