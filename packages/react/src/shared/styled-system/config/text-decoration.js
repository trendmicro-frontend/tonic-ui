import system from '../core/system';

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
