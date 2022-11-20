import system from '../core/system';

const _border = {
  /**
   * The border shorthand CSS property sets an element's border.
   * It sets the values of border-width, border-style, and border-color.
   */
  border: {
    property: 'border',
    scale: 'borders',
  },
  borderWidth: {
    property: 'borderWidth',
    scale: 'sizes',
  },
  borderStyle: true,
  borderColor: {
    property: 'borderColor',
    scale: 'colors',
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
  borderTopWidth: {
    property: 'borderTopWidth',
    scale: 'sizes',
  },
  borderTopStyle: true,
  borderTopColor: {
    property: 'borderTopColor',
    scale: 'colors',
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
  borderRightWidth: {
    property: 'borderRightWidth',
    scale: 'sizes',
  },
  borderRightStyle: true,
  borderRightColor: {
    property: 'borderRightColor',
    scale: 'colors',
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
  borderBottomWidth: {
    property: 'borderBottomWidth',
    scale: 'sizes',
  },
  borderBottomStyle: true,
  borderBottomColor: {
    property: 'borderBottomColor',
    scale: 'colors',
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
  borderLeftWidth: {
    property: 'borderLeftWidth',
    scale: 'sizes',
  },
  borderLeftStyle: true,
  borderLeftColor: {
    property: 'borderLeftColor',
    scale: 'colors',
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
};

const group = 'border';
const config = {
  ..._border,
  ..._borderTop,
  ..._borderRight,
  ..._borderBottom,
  ..._borderLeft,
  ..._borderRadius,

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
