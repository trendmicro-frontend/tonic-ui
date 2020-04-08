import { get } from '@styled-system/core';

/**
 * The `width` prop is transformed based on the following:
 * • Numbers from 0-1 are converted to percentage widths.
 * • Numbers greater than 1 are converted to pixel values.
 * • String values are passed as raw CSS values.
 * • Arrays are converted to responsive width styles.
 * • If `theme.sizes` is defined, the `width` prop will attempt to pick up values from the theme.
 */
const getWidth = (n, scale) => {
  const defaultValue = (!Number.isFinite(n) || n > 1)
    ? n
    : n * 100 + '%';
  return get(scale, n, defaultValue);
};

export {
  getWidth,
};
