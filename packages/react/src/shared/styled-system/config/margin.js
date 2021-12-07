import { system } from '@styled-system/core';
import * as transform from '../utils/transform-functions';

const config = {
  margin: {
    property: 'margin',
    scale: 'space',
    transform: transform.margin,
  },
  marginTop: {
    property: 'marginTop',
    scale: 'space',
    transform: transform.margin,
  },
  marginRight: {
    property: 'marginRight',
    scale: 'space',
    transform: transform.margin,
  },
  marginBottom: {
    property: 'marginBottom',
    scale: 'space',
    transform: transform.margin,
  },
  marginLeft: {
    property: 'marginLeft',
    scale: 'space',
    transform: transform.margin,
  },
};

config.marginX = {
  properties: ['marginLeft', 'marginRight'],
  scale: 'space',
  transform: transform.margin,
};
config.marginY = {
  properties: ['marginTop', 'marginBottom'],
  scale: 'space',
  transform: transform.margin,
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
