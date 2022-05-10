import system from '../core/system';
import { positiveOrNegative as positiveOrNegativeTransform } from '../utils/transforms';

const group = 'scroll';
const config = {
  scrollBehavior: true,
  scrollMargin: {
    property: 'scrollMargin',
    scale: 'space',
    transform: positiveOrNegativeTransform, // multi-value
  },
  scrollMarginTop: {
    property: 'scrollMarginTop',
    scale: 'space',
    transform: positiveOrNegativeTransform,
  },
  scrollMarginRight: {
    property: 'scrollMarginRight',
    scale: 'space',
    transform: positiveOrNegativeTransform,
  },
  scrollMarginBottom: {
    property: 'scrollMarginBottom',
    scale: 'space',
    transform: positiveOrNegativeTransform,
  },
  scrollMarginLeft: {
    property: 'scrollMarginLeft',
    scale: 'space',
    transform: positiveOrNegativeTransform,
  },
  scrollPadding: {
    property: 'scrollPadding',
    scale: 'space',
  },
  scrollPaddingTop: {
    property: 'scrollPaddingTop',
    scale: 'space',
  },
  scrollPaddingRight: {
    property: 'scrollPaddingRight',
    scale: 'space',
  },
  scrollPaddingBottom: {
    property: 'scrollPaddingBottom',
    scale: 'space',
  },
  scrollPaddingLeft: {
    property: 'scrollPaddingLeft',
    scale: 'space',
  },
  scrollSnapAlign: true,
  scrollSnapType: true,
};

config.scrollMarginX = {
  properties: ['scrollMarginLeft', 'scrollMarginRight'],
  scale: 'space',
  transform: positiveOrNegativeTransform,
};
config.scrollMarginY = {
  properties: ['scrollMarginTop', 'scrollMarginBottom'],
  scale: 'space',
  transform: positiveOrNegativeTransform,
};
config.scrollPaddingX = {
  properties: ['scrollPaddingLeft', 'scrollPaddingRight'],
  scale: 'space',
};
config.scrollPaddingY = {
  properties: ['scrollPaddingTop', 'scrollPaddingBottom'],
  scale: 'space',
};

const scroll = system(config, { group });

export default scroll;
