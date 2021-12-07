import { system } from '@styled-system/core';

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
