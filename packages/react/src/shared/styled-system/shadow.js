import { system } from '@styled-system/core';

const config = {
  boxShadow: {
    property: 'boxShadow',
    scale: 'shadows',
  },
  textShadow: {
    property: 'textShadow',
    scale: 'shadows',
  },
};

export const shadow = system(config);

export default shadow;
