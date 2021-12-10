import ensureArray from '../utils/ensure-array';
import get from '../utils/get';

const defaultBreakpoints = [];
const defaultTheme = {};

const aliases = {
  /**
   * background
   */
  bg: 'background',
  bgAttachment: 'backgroundAttachment',
  bgClip: 'backgroundClip',
  bgColor: 'backgroundColor',
  bgImage: 'backgroundImage',
  bgPosition: 'backgroundPosition',
  bgRepeat: 'backgroundRepeat',
  bgSize: 'backgroundSize',

  /**
   * layout
   */
  w: 'width', // deprecated
  h: 'height', // deprecated

  /**
   * margin
   */
  m: 'margin',
  mt: 'marginTop',
  mr: 'marginRight',
  mb: 'marginBottom',
  ml: 'marginLeft',
  mx: 'marginX',
  my: 'marginY',

  /**
   * padding
   */
  p: 'padding',
  pt: 'paddingTop',
  pr: 'paddingRight',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  px: 'paddingX',
  py: 'paddingY',
};

const multiples = {
  borderX: ['borderLeft', 'borderRight'],
  borderY: ['borderTop', 'borderBottom'],
  marginX: ['marginLeft', 'marginRight'],
  marginY: ['marginTop', 'marginBottom'],
  paddingX: ['paddingLeft', 'paddingRight'],
  paddingY: ['paddingTop', 'paddingBottom'],
};

const scales = {
  /**
   * background
   */
  background: 'colors',
  backgroundColor: 'colors',

  /**
   * border
   */
  border: 'borders',
  borderColor: 'colors',
  borderWidth: 'sizes',
  borderTop: 'borders',
  borderTopColor: 'colors',
  borderTopWidth: 'sizes',
  borderRight: 'borders',
  borderRightColor: 'colors',
  borderRightWidth: 'sizes',
  borderBottom: 'borders',
  borderBottomColor: 'colors',
  borderBottomWidth: 'sizes',
  borderLeft: 'borders',
  borderLeftColor: 'colors',
  borderLeftWidth: 'sizes',
  borderX: 'borders',
  borderY: 'borders',
  borderRadius: 'radii',
  borderTopRightRadius: 'radii',
  borderTopLeftRadius: 'radii',
  borderBottomRightRadius: 'radii',
  borderBottomLeftRadius: 'radii',

  /**
   * color
   */
  color: 'colors',
  fill: 'colors',
  stroke: 'colors',

  /**
   * containment
   */
  containIntrinsicSize: 'sizes',

  /**
   * effect
   */
  boxShadow: 'shadows',

  /**
   * flexbox
   */
  flexBasis: 'sizes',

  /**
   * gap
   */
  gap: 'sizes',
  columnGap: 'sizes',
  rowGap: 'sizes',

  /**
   * grid
   */
  gridGap: 'sizes',
  gridColumnGap: 'sizes',
  gridRowGap: 'sizes',

  /**
   * interactivity
   */
  caretColor: 'colors',

  /**
   * layout
   */
  width: 'sizes',
  height: 'sizes',
  minWidth: 'sizes',
  maxWidth: 'sizes',
  minHeight: 'sizes',
  maxHeight: 'sizes',

  /**
   * margin
   */
  margin: 'space',
  marginTop: 'space',
  marginRight: 'space',
  marginBottom: 'space',
  marginLeft: 'space',
  marginX: 'space',
  marginY: 'space',

  /**
   * outline
   */
  outline: 'outlines',
  outlineColor: 'colors',
  outlineWidth: 'sizes',

  /**
   * padding
   */
  padding: 'space',
  paddingTop: 'space',
  paddingRight: 'space',
  paddingBottom: 'space',
  paddingLeft: 'space',
  paddingX: 'space',
  paddingY: 'space',

  /**
   * position
   */
  inset: 'space',
  insetBlock: 'space',
  insetBlockEnd: 'space',
  insetBlockStart: 'space',
  insetInline: 'space',
  insetInlineEnd: 'space',
  insetInlineStart: 'space',
  top: 'space',
  right: 'space',
  bottom: 'space',
  left: 'space',
  zIndex: 'zIndices',

  /**
   * Text Decoration
   */
  textDecorationColor: 'colors',
  textDecorationThickness: 'sizes',
  textShadow: 'shadows',
  textUnderlineOffset: 'space',

  /**
   * Typography
   */
  fontFamily: 'fonts',
  fontSize: 'fontSizes',
  fontWeight: 'fontWeights',
  letterSpacing: 'letterSpacings',
  lineHeight: 'lineHeights',
};

const positiveOrNegative = (scale, value) => {
  if (typeof value !== 'number' || value >= 0) {
    return get(scale, value, value);
  }
  const absolute = Math.abs(value);
  const n = get(scale, absolute, absolute);
  if (typeof n === 'string') {
    return '-' + n;
  }
  return n * -1;
};

const transforms = [
  'margin',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
  'marginX',
  'marginY',
  'top',
  'bottom',
  'left',
  'right',
].reduce(
  (acc, curr) => ({
    ...acc,
    [curr]: positiveOrNegative,
  }),
  {}
);

const responsive = styles => theme => {
  const next = {};
  const breakpoints = ensureArray(get(theme, 'breakpoints', defaultBreakpoints));
  const mediaQueries = [
    null,
    ...breakpoints.map(n => `@media screen and (min-width: ${n})`),
  ];

  for (const key in styles) {
    if (!Object.prototype.hasOwnProperty.call(styles, key)) {
      continue;
    }

    const value = typeof styles[key] === 'function' ? styles[key](theme) : styles[key];
    if (value == null) {
      continue;
    }

    if (!Array.isArray(value)) {
      next[key] = value;
      continue;
    }

    for (let i = 0; i < value.slice(0, mediaQueries.length).length; i++) {
      const media = mediaQueries[i];
      if (!media) {
        next[key] = value[i];
        continue;
      }
      next[media] = next[media] || {};
      if (value[i] == null) {
        continue;
      }
      next[media][key] = value[i];
    }
  }

  return next;
};

const css = args => (props = {}) => {
  const theme = {
    ...defaultTheme,
    ...(props.theme || props),
  };
  let result = {};
  const obj = typeof args === 'function' ? args(theme) : args;
  const styles = responsive(obj)(theme);

  for (const key in styles) {
    if (!Object.prototype.hasOwnProperty.call(styles, key)) {
      continue;
    }

    const x = styles[key];
    const val = typeof x === 'function' ? x(theme) : x;

    if (key === 'variant') {
      const variant = css(get(theme, val))(theme);
      result = {
        ...result,
        ...variant,
      };
      continue;
    }

    if (val && typeof val === 'object') {
      result[key] = css(val)(theme);
      continue;
    }

    const prop = get(aliases, key, key);
    const scaleName = get(scales, prop);
    const scale = get(theme, scaleName, get(theme, prop, {}));
    const transform = get(transforms, prop, get);
    const value = transform(scale, val, val);

    if (multiples[prop]) {
      const dirs = multiples[prop];
      for (let i = 0; i < dirs.length; i++) {
        result[dirs[i]] = value;
      }
    } else {
      result[prop] = value;
    }
  }

  return result;
};

export default css;
