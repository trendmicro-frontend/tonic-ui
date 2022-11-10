import system from '../core/system';
import { positiveOrNegative as positiveOrNegativeTransform } from '../utils/transforms';

/**
 * https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Shapes
 */
const group = 'shape';
const config = {
  shapeImageThreshold: true,
  shapeMargin: {
    property: 'shapeMargin',
    scale: 'space',
    transform: positiveOrNegativeTransform, // multi-value
  },
  shapeOutside: true,
};

const shape = system(config, { group });

export default shape;
