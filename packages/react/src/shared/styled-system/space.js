import { get, system, compose } from '@styled-system/core';

const isNumber = n => typeof n === 'number' && !isNaN(n);

const getMargin = (n, scale) => {
  if (!isNumber(n)) {
    return get(scale, n, n);
  }

  const isNegative = n < 0;
  const absolute = Math.abs(n);
  const value = get(scale, absolute, absolute);
  if (!isNumber(value)) {
    return isNegative ? '-' + value : value;
  }
  return value * (isNegative ? -1 : 1);
}

const marginConfig = {
  margin: {
    property: 'margin',
    scale: 'space',
    transform: getMargin,
  },
  marginTop: {
    property: 'marginTop',
    scale: 'space',
    transform: getMargin,
  },
  marginRight: {
    property: 'marginRight',
    scale: 'space',
    transform: getMargin,
  },
  marginBottom: {
    property: 'marginBottom',
    scale: 'space',
    transform: getMargin,
  },
  marginLeft: {
    property: 'marginLeft',
    scale: 'space',
    transform: getMargin,
  },
};

marginConfig.marginX = {
  properties: ['marginLeft', 'marginRight'],
  scale: 'space',
  transform: getMargin,
};
marginConfig.marginY = {
  properties: ['marginTop', 'marginBottom'],
  scale: 'space',
  transform: getMargin,
};
marginConfig.m = marginConfig.margin;
marginConfig.mt = marginConfig.marginTop;
marginConfig.mr = marginConfig.marginRight;
marginConfig.mb = marginConfig.marginBottom;
marginConfig.ml = marginConfig.marginLeft;
marginConfig.mx = marginConfig.marginX;
marginConfig.my = marginConfig.marginY;

const paddingConfig = {
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

paddingConfig.paddingX = {
  properties: ['paddingLeft', 'paddingRight'],
  scale: 'space',
};
paddingConfig.paddingY = {
  properties: ['paddingTop', 'paddingBottom'],
  scale: 'space',
};
paddingConfig.p = paddingConfig.padding;
paddingConfig.pt = paddingConfig.paddingTop;
paddingConfig.pr = paddingConfig.paddingRight;
paddingConfig.pb = paddingConfig.paddingBottom;
paddingConfig.pl = paddingConfig.paddingLeft;
paddingConfig.px = paddingConfig.paddingX;
paddingConfig.py = paddingConfig.paddingY;

export const margin = system(marginConfig);
export const padding = system(paddingConfig);
export const space = compose(margin, padding);

export default space;
