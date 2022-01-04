import system from '../core/system';

const group = 'transition';
const config = {
  transition: true,
  transitionDelay: true,
  transitionDuration: true,
  transitionProperty: true,
  transitionTimingFunction: true,
  willChange: true,
};

const transition = system(config, { group });

export default transition;
