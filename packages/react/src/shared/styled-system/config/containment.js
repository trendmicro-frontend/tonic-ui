import system from '../core/system';

const config = {
  contain: true,
  containIntrinsicSize: {
    property: 'containIntrinsicSize',
    scale: 'sizes',
  },
  contentVisibility: true,
};

const containment = system(config);

export default containment;
