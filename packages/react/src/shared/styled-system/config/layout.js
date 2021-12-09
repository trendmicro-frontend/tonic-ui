import system from '../core/system';

const config = {
  width: {
    property: 'width',
    scale: 'sizes',
  },
  height: {
    property: 'height',
    scale: 'sizes',
  },
  minWidth: {
    property: 'minWidth',
    scale: 'sizes',
  },
  minHeight: {
    property: 'minHeight',
    scale: 'sizes',
  },
  maxWidth: {
    property: 'maxWidth',
    scale: 'sizes',
  },
  maxHeight: {
    property: 'maxHeight',
    scale: 'sizes',
  },
  overflow: true,
  overflowX: true,
  overflowY: true,
  display: true,
  verticalAlign: true,
  aspectRatio: true,
  boxSizing: true,
  float: true,
  objectFit: true,
  objectPosition: true,
  visibility: true,
};

config.w = config.width; // deprecated
config.h = config.height; // deprecated

const layout = system(config);

export default layout;
