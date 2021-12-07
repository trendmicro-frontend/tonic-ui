import { system } from '@styled-system/core';

const config = {
  textDecoration: true,
  textDecorationColor: true,
  textDecorationLine: true,
  textDecorationStyle: true,
  textDecorationThickness: true,
  textShadow: {
    property: 'textShadow',
    scale: 'shadows',
  },
  textUnderlineOffset: true,
};

const textDecoration = system(config);

export default textDecoration;
