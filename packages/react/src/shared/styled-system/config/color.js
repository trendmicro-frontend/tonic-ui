import { system } from '@styled-system/core';

const config = {
  color: {
    property: 'color',
    scale: 'colors',
  },
  colorScheme: true,
  /**
   * The CSS `fill` property for SVG elements
   */
  fill: {
    property: 'fill',
    scale: 'colors',
  },
  /**
   * The CSS `stroke` property for SVG elements
   */
  stroke: {
    property: 'stroke',
    scale: 'colors',
  },
};

const color = system(config);

export default color;
