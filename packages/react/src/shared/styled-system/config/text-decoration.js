import system from '../core/system';
import { positiveOrNegative as positiveOrNegativeTransform } from '../utils/transforms';

const config = {
  textDecoration: true,
  textDecorationColor: {
    property: 'textDecorationColor',
    scale: 'colors',
  },
  textDecorationLine: true,
  textDecorationStyle: true,
  textDecorationThickness: {
    property: 'textDecorationThickness',
    scale: 'sizes',
  },
  textShadow: {
    property: 'textShadow',
    scale: 'shadows',
  },
  textUnderlineOffset: {
    property: 'textUnderlineOffset',
    scale: 'space',
    transform: positiveOrNegativeTransform,
  },
};

const textDecoration = system(config);

export default textDecoration;
