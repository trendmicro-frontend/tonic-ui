import { system } from '@styled-system/core';
import * as transform from '../utils/transform-functions';

const config = {
  position: true,
  zIndex: {
    property: 'zIndex',
    scale: 'zIndices',
  },
  top: {
    property: 'top',
    scale: 'space',
    transform: transform.margin,
  },
  right: {
    property: 'right',
    scale: 'space',
    transform: transform.margin,
  },
  bottom: {
    property: 'bottom',
    scale: 'space',
    transform: transform.margin,
  },
  left: {
    property: 'left',
    scale: 'space',
    transform: transform.margin,
  },
};

const position = system(config);

export default position;
