import system from '../core/system';
import { positiveOrNegative as positiveOrNegativeTransform } from '../utils/transforms';

const group = 'margin';
const config = {
  margin: {
    property: 'margin',
    scale: 'space',
    transform: positiveOrNegativeTransform, // multi-value
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
config.m = {
  ...config.margin,
  alias: 'margin',
};
config.mt = {
  ...config.marginTop,
  alias: 'marginTop',
};
config.mr = {
  ...config.marginRight,
  alias: 'marginRight',
};
config.mb = {
  ...config.marginBottom,
  alias: 'marginBottom',
};
config.ml = {
  ...config.marginLeft,
  alias: 'marginLeft',
};
config.mx = {
  ...config.marginX,
  alias: 'marginX',
};
config.my = {
  ...config.marginY,
  alias: 'marginY',
};

const margin = system(config, { group });

export default margin;
