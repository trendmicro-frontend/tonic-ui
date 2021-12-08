import system from '../core/system';
import { positiveOrNegative as positiveOrNegativeTransform } from '../utils/transforms';

const config = {
  position: true,
  zIndex: {
    property: 'zIndex',
    scale: 'zIndices',
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
};

const position = system(config);

export default position;
