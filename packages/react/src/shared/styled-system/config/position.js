import system from '../core/system';
import { positiveOrNegative as positiveOrNegativeTransform } from '../utils/transforms';

const config = {
  inset: {
    property: 'inset',
    scale: 'space',
    transform: positiveOrNegativeTransform,
  },
  insetBlock: {
    property: 'insetBlock',
    scale: 'space',
    transform: positiveOrNegativeTransform,
  },
  insetBlockEnd: {
    property: 'insetBlockEnd',
    scale: 'space',
    transform: positiveOrNegativeTransform,
  },
  insetBlockStart: {
    property: 'insetBlockStart',
    scale: 'space',
    transform: positiveOrNegativeTransform,
  },
  insetInline: {
    property: 'insetInline',
    scale: 'space',
    transform: positiveOrNegativeTransform,
  },
  insetInlineEnd: {
    property: 'insetInlineEnd',
    scale: 'space',
    transform: positiveOrNegativeTransform,
  },
  insetInlineStart: {
    property: 'insetInlineStart',
    scale: 'space',
    transform: positiveOrNegativeTransform,
  },
  position: true,
  top: {
    property: 'top',
    scale: 'space',
    transform: positiveOrNegativeTransform,
  },
  right: {
    property: 'right',
    scale: 'space',
    transform: positiveOrNegativeTransform,
  },
  bottom: {
    property: 'bottom',
    scale: 'space',
    transform: positiveOrNegativeTransform,
  },
  left: {
    property: 'left',
    scale: 'space',
    transform: positiveOrNegativeTransform,
  },
  zIndex: {
    property: 'zIndex',
    scale: 'zIndices',
  },
};

const position = system(config);

export default position;
