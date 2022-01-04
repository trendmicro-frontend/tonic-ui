import system from '../core/system';

const group = 'containment';
const config = {
  contain: true,
  containIntrinsicSize: {
    property: 'containIntrinsicSize',
    scale: 'sizes',
  },
  contentVisibility: true,
};

const containment = system(config, { group });

export default containment;
