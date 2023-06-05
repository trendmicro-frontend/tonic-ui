import system from './system';
import ensureArray from './utils/ensure-array';
import get from './utils/get';
import { pseudoClassSelector, pseudoElementSelector } from './pseudo';

const createPseudoResolver = (theme) => (styleProps) => {
  if (styleProps === null || styleProps === undefined) {
    return {};
  }

  /**
   * Pseudo-classes must be declared in a specific order, as shown below:
   *
   * ```
   * :link
   * :visited
   * :hover
   * :active
   * ```
   *
   * Each pseudo-class corresponds to an event which can only happen later in the timeline than the one before.
   * 1. A link is unvisited before it is visited.
   * 2. A link is visited before it is hovered over.
   * 3. A link is hovered over before it is in active use.
   */
  const orderList = [
    '_focus',
    '_visited',
    '_hover',
    '_focusHover',
    '_active',
    '_focusActive',
    '_focusSelected',
    '_focusWithin',
    '_disabled', // `_disabled` must be placed after above pseudo-classes
    '_enabled',
  ];
  const orderedEntries = Object.entries(styleProps).sort((a, b) => {
    const aIndex = orderList.indexOf(a[0]);
    const bIndex = orderList.indexOf(b[0]);
    return aIndex - bIndex;
  });

  let entries = [];

  for (const [name, value] of orderedEntries) {
    const selectorFunction = pseudoClassSelector[name] ?? pseudoElementSelector[name];
    if (typeof selectorFunction === 'function') {
      entries = entries.concat(selectorFunction(value));
    } else {
      entries = entries.concat([[name, value]]);
    }
  }

  return Object.fromEntries(entries);
};

const createResponsiveResolver = theme => styleProps => {
  const next = {};
  const breakpoints = ensureArray(get(theme, 'breakpoints'));
  const mediaQueries = [
    null,
    ...breakpoints.map(n => `@media screen and (min-width: ${n})`),
  ];

  for (const key in styleProps) {
    if (!Object.prototype.hasOwnProperty.call(styleProps, key)) {
      continue;
    }

    const value = typeof styleProps[key] === 'function' ? styleProps[key](theme) : styleProps[key];
    if (value === null || value === undefined) {
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

const sx = (valueOrFn) => (props = {}) => {
  if (valueOrFn === null || valueOrFn === undefined) {
    return {};
  }

  if (Array.isArray(valueOrFn)) {
    return valueOrFn.reduce((acc, item) => ({
      ...acc,
      ...sx(item)(props),
    }), {});
  }

  const theme = {
    ...(props.theme || props),
  };
  const resolvePseudo = createPseudoResolver(theme);
  const resolveResponsive = createResponsiveResolver(theme);
  const originalStyleProps = (typeof valueOrFn === 'function') ? valueOrFn(theme) : valueOrFn;
  const resolvedStyleProps = resolveResponsive(resolvePseudo(originalStyleProps));

  let result = {};
  for (const key in resolvedStyleProps) {
    if (!Object.hasOwn(resolvedStyleProps, key)) {
      continue;
    }

    const styleValueOrFn = resolvedStyleProps[key];
    const value = (typeof styleValueOrFn === 'function') ? styleValueOrFn(theme) : styleValueOrFn;

    if (value && typeof value === 'object') {
      // Make a recursive call to handle nested objects
      result[key] = sx(value)(theme);
      continue;
    }

    /**
     * The system config is a map of all style props with its corresponding "sx" function and properties.
     *
     * {
     *   background: f sx(scale, value, props)
     *     alias: undefined
     *     defaultScale: {}
     *     group: "background"
     *     properties: ['background']
     *     scale: "colors"
     *   bg: f sx(scale, value, props)
     *     alias: "background"
     *     defaultScale: {}
     *     group: "background"
     *     properties: ['background']
     *     scale: "colors"
     * }
     */
    const _sx = system.config[key];
    if (typeof _sx !== 'function') {
      // pass them through to the result for unknown props
      result[key] = value;
      continue;
    }

    const scale = get(theme, _sx.scale, _sx.defaultScale);

    result = {
      ...result,
      ..._sx(scale, value, { ...resolvedStyleProps, theme }),
    };
  }

  return result;
};

export default sx;
