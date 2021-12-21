import system from '../core/system';

const config = {
  transition: true,
  transitionDelay: true,
  transitionDuration: true,
  transitionProperty: true,
  transitionTimingFunction: true,
  willChange: true,
};

const transition = system(config);

export default transition;
