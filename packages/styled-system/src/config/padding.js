import system from '../core/system';

const group = 'padding';
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
config.p = {
  ...config.padding,
  alias: 'padding',
};
config.pt = {
  ...config.paddingTop,
  alias: 'paddingTop',
};
config.pr = {
  ...config.paddingRight,
  alias: 'paddingRight',
};
config.pb = {
  ...config.paddingBottom,
  alias: 'paddingBottom',
};
config.pl = {
  ...config.paddingLeft,
  alias: 'paddingLeft',
};
config.px = {
  ...config.paddingX,
  alias: 'paddingX',
};
config.py = {
  ...config.paddingY,
  alias: 'paddingY',
};

const padding = system(config, { group });

export default padding;
