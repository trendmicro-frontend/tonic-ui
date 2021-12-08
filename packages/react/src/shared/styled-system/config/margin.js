import system from '../core/system';
import { positiveOrNegative as positiveOrNegativeTransform } from '../utils/transforms';

const config = {
  margin: {
    property: 'margin',
    scale: 'space',
    transform: positiveOrNegativeTransform,
  },
  marginTop: {
    property: 'marginTop',
    scale: 'space',
    transform: positiveOrNegativeTransform,
  },
  marginRight: {
    property: 'marginRight',
    scale: 'space',
    transform: positiveOrNegativeTransform,
  },
  marginBottom: {
    property: 'marginBottom',
    scale: 'space',
    transform: positiveOrNegativeTransform,
  },
  marginLeft: {
    property: 'marginLeft',
    scale: 'space',
    transform: positiveOrNegativeTransform,
  },
};

config.marginX = {
  properties: ['marginLeft', 'marginRight'],
  scale: 'space',
  transform: positiveOrNegativeTransform,
};
config.marginY = {
  properties: ['marginTop', 'marginBottom'],
  scale: 'space',
  transform: positiveOrNegativeTransform,
};
config.m = config.margin;
config.mt = config.marginTop;
config.mr = config.marginRight;
config.mb = config.marginBottom;
config.ml = config.marginLeft;
config.mx = config.marginX;
config.my = config.marginY;

const margin = system(config);

export default margin;
