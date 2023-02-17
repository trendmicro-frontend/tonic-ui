import system from '../core/system';
import {
  outline as outlineTransform,
  positiveOrNegative as positiveOrNegativeTransform,
} from '../utils/transforms';

const group = 'outline';
const config = {
  outline: {
    // If the "outline" property value is "0", "none", or 0, transform it to:
    // {
    //   outline: "2px solid transparent"
    //   outlineOffset: "2px"
    // }
    // Otherwise, leave the "outline" property value as-is
    properties: ['outline', 'outlineOffset'],
    scale: 'outlines',
    transform: outlineTransform,
  },
  outlineColor: {
    property: 'outlineColor',
    scale: 'colors',
  },
  outlineOffset: {
    property: 'outlineOffset',
    scale: 'space',
    transform: positiveOrNegativeTransform,
  },
  outlineWidth: {
    property: 'outlineWidth',
    scale: 'sizes',
  },
  outlineStyle: true,
};

const outline = system(config, { group });

export default outline;
