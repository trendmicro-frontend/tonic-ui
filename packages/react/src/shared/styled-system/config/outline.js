import system from '../core/system';
import {
  outline as outlineTransform,
  positiveOrNegative as positiveOrNegativeTransform,
} from '../utils/transforms';

const config = {
  outline: {
    property: 'outline',
    scale: 'outlines',
    transform: outlineTransform, // deprecated
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

const outline = system(config);

export default outline;
