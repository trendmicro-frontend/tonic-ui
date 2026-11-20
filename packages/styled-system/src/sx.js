import { get, isNullish, isPlainObject } from '@tonic-ui/utils';
import system from './system';
import { pseudoClassSelector, pseudoElementSelector } from './pseudo';

const resolvePseudo = (styleProps, theme) => {
  if (isNullish(styleProps)) {
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
  for (const [name, valueOrFn] of orderedEntries) {
    const value = typeof valueOrFn === 'function' ? valueOrFn(theme) : valueOrFn;
    if (Array.isArray(value)) {
      throw new TypeError(`Array values are not supported for sx property "${name}". Use explicit media queries instead.`);
    }
    const selectorFunction = pseudoClassSelector[name] ?? pseudoElementSelector[name];
    if (typeof selectorFunction === 'function') {
      entries = entries.concat(selectorFunction(value));
    } else {
      entries.push([name, value]);
    }
  }
  return Object.fromEntries(entries);
};

const mergeResolvedSx = (acc, resolved) => {
  const next = { ...acc };
  for (const key in resolved) {
    if (!Object.prototype.hasOwnProperty.call(resolved, key)) {
      continue;
    }
    const accValue = next[key];
    const resolvedValue = resolved[key];
    next[key] = (isPlainObject(accValue) && isPlainObject(resolvedValue))
      ? mergeResolvedSx(accValue, resolvedValue)
      : resolvedValue;
  }
  return next;
};

const resolveSx = (valueOrFn, props) => {
  if (isNullish(valueOrFn)) {
    return {};
  }

  /**
   * If an array is provided, each item is resolved independently and merged left to right,
   * per declaration -- a later item overrides an earlier one's individual properties without
   * discarding the rest. For a flat property this is a plain last-write-wins overwrite. For a
   * nested rule (a pseudo-selector, media query, or any other plain-object value), the merge
   * recurses instead of replacing the whole nested object, so two array items that both touch
   * the SAME nested selector (e.g. two peer contributors both declaring `&:hover`) compose
   * their declarations together rather than the later one silently discarding everything the
   * earlier one declared under that selector.
   *
   * ```js
   * sx([
   *   { color: 'red:50' },
   *   { bg: 'gray:80' },
   *   (theme) => ({ fontSize: theme.fontSizes.sm }),
   * ])
   * ```
   */
  if (Array.isArray(valueOrFn)) {
    return valueOrFn.reduce((acc, item) => {
      const resolved = resolveSx(item, props);
      return mergeResolvedSx(acc, resolved);
    }, {});
  }

  const theme = {
    ...(props.theme || props),
  };
  const originalStyleProps = (typeof valueOrFn === 'function') ? valueOrFn(theme) : valueOrFn;
  if (Array.isArray(originalStyleProps)) {
    return resolveSx(originalStyleProps, props);
  }
  const resolvedStyleProps = resolvePseudo(originalStyleProps, theme);

  let result = {};
  for (const key in resolvedStyleProps) {
    if (!Object.prototype.hasOwnProperty.call(resolvedStyleProps, key)) {
      continue;
    }

    const styleValueOrFn = resolvedStyleProps[key];
    const value = (typeof styleValueOrFn === 'function') ? styleValueOrFn(theme) : styleValueOrFn;
    if (isNullish(value)) {
      continue;
    }
    if (Array.isArray(value)) {
      throw new TypeError(`Array values are not supported for sx property "${key}". Use explicit media queries instead.`);
    }

    if (isPlainObject(value)) {
      /**
       * An object value indicates a nested rule whose inner style tokens are resolved recursively against the theme.
       *
       * ```js
       * sx({ '&:hover': { color: 'red:50', bg: 'gray:80' } })
       * // key   → '&:hover'
       * // value → { color: 'red:50', bg: 'gray:80' }
       * ```
       *
       * `__colorMode` is forwarded so color tokens resolve correctly in dark mode.
       */
      result[key] = resolveSx(value, { theme, __colorMode: props.__colorMode });
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
      ..._sx(scale, value, { ...resolvedStyleProps, theme, __colorMode: props.__colorMode }),
    };
  }

  return result;
};

const sx = (valueOrFn) => (props = {}) => resolveSx(valueOrFn, props);

export default sx;
