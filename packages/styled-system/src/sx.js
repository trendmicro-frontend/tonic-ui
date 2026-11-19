import { get, isNullish, isPlainObject } from '@tonic-ui/utils';
import { createBreakpoints } from '@tonic-ui/utils/internal';
import system from './system';
import { pseudoClassSelector, pseudoElementSelector } from './pseudo';

const defaultBreakpoints = createBreakpoints();

const createPseudoResolver = (theme) => (styleProps) => {
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

const emptyQuery = Symbol('empty responsive query');

function removeEmptyQueries(styles) {
  for (const key of Object.keys(styles)) {
    if (styles[key] === emptyQuery) {
      delete styles[key];
    } else if (isPlainObject(styles[key])) {
      removeEmptyQueries(styles[key]);
    }
  }
  return styles;
}

// Deep merging preserves declarations in nested rules. Raw responsive declarations also
// need overwritten keys moved to the end so aliases resolve in authored order.
const mergeResolvedSx = (acc, resolved, preserveSourceOrder = false, authoredRules) => {
  const next = { ...acc };
  for (const key in resolved) {
    if (!Object.prototype.hasOwnProperty.call(resolved, key)) {
      continue;
    }
    const accValue = next[key];
    const resolvedValue = resolved[key];
    if (resolvedValue === emptyQuery && Object.prototype.hasOwnProperty.call(next, key)) {
      continue;
    }
    const wasAuthored = authoredRules?.has(accValue);
    const isAuthored = authoredRules?.has(resolvedValue);
    if (preserveSourceOrder || (isAuthored && !wasAuthored)) {
      delete next[key];
    }
    next[key] = (isPlainObject(accValue) && isPlainObject(resolvedValue))
      ? mergeResolvedSx(accValue, resolvedValue, preserveSourceOrder, authoredRules)
      : resolvedValue;
    if (wasAuthored || isAuthored) {
      if (isPlainObject(next[key])) {
        authoredRules.add(next[key]);
      }
    }
  }
  return next;
};

const createResponsiveResolver = theme => styleProps => {
  const next = {};
  let mediaQueries;

  for (const key in styleProps) {
    if (!Object.prototype.hasOwnProperty.call(styleProps, key)) {
      continue;
    }

    const value = typeof styleProps[key] === 'function' ? styleProps[key](theme) : styleProps[key];
    if (isNullish(value)) {
      continue;
    }

    if (!Array.isArray(value)) {
      const previous = next[key];
      if (mediaQueries?.includes(key)) {
        delete next[key];
      }
      next[key] = isPlainObject(previous) && isPlainObject(value)
        ? mergeResolvedSx(previous, value, true)
        : value;
      continue;
    }

    if (!mediaQueries) {
      const breakpoints = get(theme, 'breakpoints', defaultBreakpoints);
      mediaQueries = [null, ...breakpoints.keys.map(key => breakpoints.up(key))];
    }
    for (let i = 0; i < value.length && i < mediaQueries.length; i++) {
      const media = mediaQueries[i];
      const item = value[i];
      if (isNullish(item)) {
        // Reserve the query's position for declarations from later arrays.
        if (media) {
          next[media] ??= emptyQuery;
        }
        continue;
      }
      if (!media) {
        next[key] = item;
        continue;
      }
      next[media] = mergeResolvedSx(
        isPlainObject(next[media]) ? next[media] : {},
        { [key]: item },
        true
      );
    }
  }

  return next;
};

const resolveSx = (valueOrFn, props, authoredRules) => {
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
    const rules = authoredRules ?? new WeakSet();
    const result = valueOrFn.reduce((acc, item) => mergeResolvedSx(acc, resolveSx(item, props, rules), false, rules), {});
    return authoredRules ? result : removeEmptyQueries(result);
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
    if (!Object.prototype.hasOwnProperty.call(resolvedStyleProps, key)) {
      continue;
    }

    const styleValueOrFn = resolvedStyleProps[key];
    if (styleValueOrFn === emptyQuery) {
      if (authoredRules) {
        result[key] = emptyQuery;
      }
      continue;
    }
    const value = (typeof styleValueOrFn === 'function') ? styleValueOrFn(theme) : styleValueOrFn;

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
      result[key] = resolveSx(value, { theme, __colorMode: props.__colorMode }, authoredRules);
      if (authoredRules && key.startsWith('@media ') && Object.prototype.hasOwnProperty.call(originalStyleProps, key)) {
        authoredRules.add(result[key]);
      }
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
