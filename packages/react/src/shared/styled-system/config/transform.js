import { system } from '@styled-system/core';

const config = {
  backfaceVisibility: true,
  perspective: true,
  perspectiveOrigin: true,
  transform: true,
  transformBox: true,
  transformOrigin: true,
  transformStyle: true,
};

const transform = system(config);

export default transform;
