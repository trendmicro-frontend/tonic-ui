import { get, system } from '@styled-system/core';

const isFiniteNumber = n => (typeof n === 'number') && !Number.isNaN(n);

/**
 * The `width` prop is transformed based on the following:
 * • Numbers from 0-1 are converted to percentage widths.
 * • Numbers greater than 1 are converted to pixel values.
 * • String values are passed as raw CSS values.
 * • Arrays are converted to responsive width styles.
 * • If `theme.sizes` is defined, the `width` prop will attempt to pick up values from the theme.
 */
const getWidth = (n, scale) => {
  const defaultValue = (!isFiniteNumber(n) || n > 1)
    ? n
    : n * 100 + '%';
  return get(scale, n, defaultValue);
};

/**
 * The layout utility includes style props for the following:
 * • `width` (or `w`)
 * • `height` (or `h`)
 * • `minWidth`
 * • `minHeight`
 * • `maxWidth`
 * • `maxHeight`
 * • `overflow`
 * • `overflowX`
 * • `overflowY`
 * • `display`
 * • `verticalAlign`
 *
 * See also: https://styled-system.com/api#layout
 */
const config = {
  width: {
    property: 'width',
    scale: 'sizes',
    transform: getWidth,
  },
  w: { // shorthand
    property: 'width',
    scale: 'sizes',
    transform: getWidth,
  },
  height: {
    property: 'height',
    scale: 'sizes',
  },
  h: { // shorthand
    property: 'height',
    scale: 'sizes',
  },
  minWidth: {
    property: 'minWidth',
    scale: 'sizes',
  },
  minHeight: {
    property: 'minHeight',
    scale: 'sizes',
  },
  maxWidth: {
    property: 'maxWidth',
    scale: 'sizes',
  },
  maxHeight: {
    property: 'maxHeight',
    scale: 'sizes',
  },
  overflow: true,
  overflowX: true,
  overflowY: true,
  display: true,
  verticalAlign: true,
};

const layout = system(config);

export default layout;
