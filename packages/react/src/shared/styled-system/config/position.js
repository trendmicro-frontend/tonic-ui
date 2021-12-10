import system from '../core/system';
import { positiveOrNegative as positiveOrNegativeTransform } from '../utils/transforms';

const config = {
  position: true,
  inset: {
    property: 'inset',
    scale: 'space',
    transform: positiveOrNegativeTransform,
  },
  top: {
    property: 'top',
    scale: 'space',
    transform: positiveOrNegativeTransform,
  },
  right: {
    property: 'right',
    scale: 'space',
    transform: positiveOrNegativeTransform,
  },
  bottom: {
    property: 'bottom',
    scale: 'space',
    transform: positiveOrNegativeTransform,
  },
  left: {
    property: 'left',
    scale: 'space',
    transform: positiveOrNegativeTransform,
  },
  zIndex: {
    property: 'zIndex',
    scale: 'zIndices',
  },
};

const position = system(config);

export default position;
