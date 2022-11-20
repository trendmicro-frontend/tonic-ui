import system from '../core/system';
import { positiveOrNegative as positiveOrNegativeTransform } from '../utils/transforms';

const _border = {
  /**
   * The border shorthand CSS property sets an element's border.
   * It sets the values of border-width, border-style, and border-color.
   */
  border: {
    property: 'border',
    scale: 'borders',
  },
  borderColor: {
    property: 'borderColor',
    scale: 'colors',
  },
  borderStyle: true,
  borderWidth: {
    property: 'borderWidth',
    scale: 'sizes',
  },
};

const _borderTop = {
  /**
   * The border-top shorthand CSS property sets all the properties of an element's top border.
   * It sets the values of border-top-width, border-top-style and border-top-color.
   */
  borderTop: {
    property: 'borderTop',
    scale: 'borders',
  },
  borderTopColor: {
    property: 'borderTopColor',
    scale: 'colors',
  },
  borderTopStyle: true,
  borderTopWidth: {
    property: 'borderTopWidth',
    scale: 'sizes',
  },
};

const _borderRight = {
  /**
   * The border-right shorthand CSS property sets all the properties of an element's right border.
   * It sets the values of border-right-width, border-right-style and border-right-color.
   */
  borderRight: {
    property: 'borderRight',
    scale: 'borders',
  },
  borderRightColor: {
    property: 'borderRightColor',
    scale: 'colors',
  },
  borderRightStyle: true,
  borderRightWidth: {
    property: 'borderRightWidth',
    scale: 'sizes',
  },
};

const _borderBottom = {
  /**
   * The border-bottom shorthand CSS property sets an element's bottom border.
   * It sets the values of border-bottom-width, border-bottom-style and border-bottom-color.
   */
  borderBottom: {
    property: 'borderBottom',
    scale: 'borders',
  },
  borderBottomColor: {
    property: 'borderBottomColor',
    scale: 'colors',
  },
  borderBottomStyle: true,
  borderBottomWidth: {
    property: 'borderBottomWidth',
    scale: 'sizes',
  },
};

const _borderLeft = {
  /**
   * The border-left shorthand CSS property sets all the properties of an element's left border.
   * It sets the values of border-left-width, border-left-style and border-left-color.
   */
  borderLeft: {
    property: 'borderLeft',
    scale: 'borders',
  },
  borderLeftColor: {
    property: 'borderLeftColor',
    scale: 'colors',
  },
  borderLeftStyle: true,
  borderLeftWidth: {
    property: 'borderLeftWidth',
    scale: 'sizes',
  },
};

const _borderRadius = {
  /**
   * The border-radius shorthand CSS property sets the rounding of an element's corners.
   * It sets the values of border-top-left-radius, border-top-right-radius, border-bottom-right-radius, and border-bottom-left-radius.
   */
  borderRadius: {
    property: 'borderRadius',
    scale: 'radii',
  },
  borderTopLeftRadius: {
    property: 'borderTopLeftRadius',
    scale: 'radii',
  },
  borderTopRightRadius: {
    property: 'borderTopRightRadius',
    scale: 'radii',
  },
  borderBottomLeftRadius: {
    property: 'borderBottomLeftRadius',
    scale: 'radii',
  },
  borderBottomRightRadius: {
    property: 'borderBottomRightRadius',
    scale: 'radii',
  },
  borderEndEndRadius: {
    property: 'borderEndEndRadius',
    scale: 'radii',
  },
  borderEndStartRadius: {
    property: 'borderEndStartRadius',
    scale: 'radii',
  },
  borderStartEndRadius: {
    property: 'borderStartEndRadius',
    scale: 'radii',
  },
  borderStartStartRadius: {
    property: 'borderStartStartRadius',
    scale: 'radii',
  },
};

const _borderBlock = {
  /**
   * The border-block CSS property is a shorthand property for setting the individual logical block border property values in a single place in the style sheet.
   */
  borderBlock: {
    property: 'borderBlock',
    scale: 'borders',
  },
  borderBlockColor: {
    property: 'borderBlockColor',
    scale: 'colors',
  },
  borderBlockStyle: true,
  borderBlockWidth: {
    property: 'borderBlockWidth',
    scale: 'sizes',
  },
  borderBlockEnd: {
    property: 'borderBlockEnd',
    scale: 'borders',
  },
  borderBlockEndColor: {
    property: 'borderBlockEndColor',
    scale: 'colors',
  },
  borderBlockEndStyle: true,
  borderBlockEndWidth: {
    property: 'borderBlockEndWidth',
    scale: 'sizes',
  },
  borderBlockStart: {
    property: 'borderBlockStart',
    scale: 'borders',
  },
  borderBlockStartColor: {
    property: 'borderBlockStartColor',
    scale: 'colors',
  },
  borderBlockStartStyle: true,
  borderBlockStartWidth: {
    property: 'borderBlockStartWidth',
    scale: 'sizes',
  },
};

const _borderImage = {
  /**
   * The border-image shorthand CSS property draws an image around a given element. It replaces the element's regular border.
   */
  borderImage: true,
  borderImageOutset: {
    property: 'borderImageOutset',
    scale: 'space',
    transform: positiveOrNegativeTransform, // multi-value
  },
  borderImageRepeat: true,
  borderImageSlice: {
    property: 'borderImageSlice',
    scale: 'space',
    transform: positiveOrNegativeTransform, // multi-value
  },
  borderImageSource: true,
  borderImageWidth: {
    property: 'borderImageWidth',
    scale: 'sizes',
  },
};

const _borderInline = {
  /**
   * The border-inline CSS property is a shorthand property for setting the individual logical inline border property values in a single place in the style sheet.
   */
  borderInline: {
    property: 'borderInline',
    scale: 'borders',
  },
  borderInlineColor: {
    property: 'borderInlineColor',
    scale: 'colors',
  },
  borderInlineStyle: true,
  borderInlineWidth: {
    property: 'borderInlineWidth',
    scale: 'sizes',
  },
  borderInlineEnd: {
    property: 'borderInlineEnd',
    scale: 'borders',
  },
  borderInlineEndColor: {
    property: 'borderInlineEndColor',
    scale: 'colors',
  },
  borderInlineEndStyle: true,
  borderInlineEndWidth: {
    property: 'borderInlineEndWidth',
    scale: 'sizes',
  },
  borderInlineStart: {
    property: 'borderInlineStart',
    scale: 'borders',
  },
  borderInlineStartColor: {
    property: 'borderInlineStartColor',
    scale: 'colors',
  },
  borderInlineStartStyle: true,
  borderInlineStartWidth: {
    property: 'borderInlineStartWidth',
    scale: 'sizes',
  },
};

const group = 'border';
const config = {
  ..._border,
  ..._borderTop,
  ..._borderRight,
  ..._borderBottom,
  ..._borderLeft,
  ..._borderRadius,
  ..._borderBlock,
  ..._borderImage,
  ..._borderInline,

  borderCollapse: true,
  borderSpacing: {
    property: 'borderSpacing',
    scale: 'sizes',
  },

  borderX: {
    properties: ['borderLeft', 'borderRight'],
    scale: 'borders',
  },
  borderY: {
    properties: ['borderTop', 'borderBottom'],
    scale: 'borders',
  },
};

const border = system(config, { group });

export default border;
