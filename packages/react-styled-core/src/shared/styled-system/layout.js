import { system } from '@styled-system/core';
import { getWidth } from './utils';

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
