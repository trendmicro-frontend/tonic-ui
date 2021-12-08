import system from '../core/system';

const config = {
  contain: true,
  containIntrinsicSize: true,
  contentVisibility: true,
};

const containment = system(config);

export default containment;
