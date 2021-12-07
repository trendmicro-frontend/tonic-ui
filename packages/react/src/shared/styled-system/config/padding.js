import { system } from '@styled-system/core';

const config = {
  padding: {
    property: 'padding',
    scale: 'space',
  },
  paddingTop: {
    property: 'paddingTop',
    scale: 'space',
  },
  paddingRight: {
    property: 'paddingRight',
    scale: 'space',
  },
  paddingBottom: {
    property: 'paddingBottom',
    scale: 'space',
  },
  paddingLeft: {
    property: 'paddingLeft',
    scale: 'space',
  },
};

config.paddingX = {
  properties: ['paddingLeft', 'paddingRight'],
  scale: 'space',
};
config.paddingY = {
  properties: ['paddingTop', 'paddingBottom'],
  scale: 'space',
};
config.p = config.padding;
config.pt = config.paddingTop;
config.pr = config.paddingRight;
config.pb = config.paddingBottom;
config.pl = config.paddingLeft;
config.px = config.paddingX;
config.py = config.paddingY;

const padding = system(config);

export default padding;
