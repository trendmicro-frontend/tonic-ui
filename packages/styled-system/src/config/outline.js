import system from '../core/system';
import positiveOrNegativeTransform from '../transforms/positiveOrNegative';

const group = 'outline';
const config = {
  outline: {
    property: 'outline',
    scale: 'outlines',
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
