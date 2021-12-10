import system from '../core/system';
import { positiveOrNegative as positiveOrNegativeTransform } from '../utils/transforms';

const config = {
  textCombineUpright: true,
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
  textOrientation: true,
  textShadow: {
    property: 'textShadow',
    scale: 'shadows',
  },
  textUnderlineOffset: {
    property: 'textUnderlineOffset',
    scale: 'space',
    transform: positiveOrNegativeTransform,
  },
  writingMode: true,
};

const textDecoration = system(config);

export default textDecoration;
