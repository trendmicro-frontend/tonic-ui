import { get, isNullish, isPlainObject } from '@tonic-ui/utils';
import system from './system';
import { pseudoClassSelector, pseudoElementSelector } from './pseudo';

const createPseudoResolver = (theme) => (styleProps) => {
  if (isNullish(styleProps)) {
    return [];
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
      throw new TypeError(`Array values are not supported for sx property "${name}". Use named breakpoint maps or explicit queries instead.`);
    }
    const selectorFunction = pseudoClassSelector[name] ?? pseudoElementSelector[name];
    if (typeof selectorFunction === 'function') {
      entries = entries.concat(selectorFunction(value));
    } else {
      entries.push([name, value]);
    }
  }

  return entries;
};

const RESPONSIVE_OBJECT_BASE_KEYS = new Set(['_', 'base']);

// Rule bodies must never be mistaken for declaration-value breakpoint maps.
const isRuleKey = key => /^[@&:.[#>+~*]/.test(key);

const isResponsiveObjectValue = (key, value, breakpoints) => {
  if (!isPlainObject(value) || isRuleKey(key)) {
    return false;
  }
  if (typeof system.config[key] === 'function') {
    // Recognized declarations containing only obsolete names still disappear,
    // rather than being emitted as invalid nested CSS.
    return true;
  }
  return Object.keys(value).some(name => (
    RESPONSIVE_OBJECT_BASE_KEYS.has(name)
    || Object.prototype.hasOwnProperty.call(breakpoints?.values ?? {}, name)
  ));
};

const createResolvedState = () => ({ styles: {} });

const getRule = (state, key, kind) => {
  if (kind === 'explicit' && /^@(?:media|container)\b/.test(key)) {
    if (!state.explicit?.has(key)) {
      // An implicit rule may have appeared before other explicit rules. Its
      // first explicit occurrence belongs after those rules in author order.
      if (state.generated?.has(key) && Object.prototype.hasOwnProperty.call(state.styles, key)) {
        const previous = state.styles[key];
        delete state.styles[key];
        state.styles[key] = previous;
      }
      (state.explicit ??= new Set()).add(key);
    }
  } else if (kind === 'generated') {
    (state.generated ??= new Set()).add(key);
  }

  let child = state.children?.get(key);
  if (!child) {
    child = createResolvedState();
    (state.children ??= new Map()).set(key, child);
    state.styles[key] = child.styles;
  }
  return child;
};

const assignDeclarations = (state, declarations) => {
  for (const key of Object.keys(declarations)) {
    state.styles[key] = declarations[key];
    state.children?.delete(key);
    state.generated?.delete(key);
    state.explicit?.delete(key);
  }
};

// Whole-style composition merges recursively, per declaration, into objects
// owned by the resolver rather than mutating any authored input.
const mergeResolvedSx = (acc, resolved) => {
  for (const key of Object.keys(resolved.styles)) {
    const child = resolved.children?.get(key);
    if (!child) {
      assignDeclarations(acc, { [key]: resolved.styles[key] });
      continue;
    }
    const isExplicit = resolved.explicit?.has(key);
    const isGenerated = resolved.generated?.has(key);
    const target = getRule(acc, key, isExplicit ? 'explicit' : (isGenerated ? 'generated' : 'nested'));
    if (isExplicit && isGenerated) {
      (acc.generated ??= new Set()).add(key);
    }
    mergeResolvedSx(target, child);
  }
  return acc;
};

const finalizeResolvedSx = (state, context) => {
  if (state.children) {
    for (const [key, child] of state.children) {
      state.styles[key] = finalizeResolvedSx(child, context);
    }
  }
  if (!state.generated || state.generated.size < 2) {
    return state.styles;
  }

  const generated = context.mediaOrder.filter(key => state.generated.has(key));
  const movable = new Set(generated.filter(key => !state.explicit?.has(key)));
  if (!movable.size) {
    return state.styles;
  }
  let keys = Object.keys(state.styles);
  const anchors = generated.filter(key => state.explicit?.has(key));
  if (!anchors.length) {
    // With no explicit collision, only swap generated slots.
    const ordered = generated.filter(key => movable.has(key));
    let index = 0;
    keys = keys.map(key => movable.has(key) ? ordered[index++] : key);
  } else {
    // Keep explicit queries fixed relative to one another while placing each
    // movable generated rule around compatible explicit breakpoint anchors.
    keys = keys.filter(key => !movable.has(key));
    for (let index = 0; index < generated.length; index++) {
      const key = generated[index];
      if (!movable.has(key)) {
        continue;
      }
      const previous = generated.slice(0, index).reverse().find(item => keys.includes(item));
      const next = generated.slice(index + 1).find(item => state.explicit?.has(item));
      const after = previous ? keys.indexOf(previous) + 1 : 0;
      const before = next ? keys.indexOf(next) : keys.length;
      keys.splice(after <= before && next ? before : after, 0, key);
    }
  }
  const result = {};
  for (const key of keys) {
    result[key] = state.styles[key];
  }
  return result;
};

const resolveDeclaration = (key, value, styleProps, props, theme) => {
  const style = system.config[key];
  if (typeof style !== 'function') {
    return { [key]: value };
  }
  const scale = get(theme, style.scale, style.defaultScale);
  return style(scale, value, { ...styleProps, theme, __colorMode: props.__colorMode });
};

const resolveSx = (valueOrFn, props, theme, context) => {
  const result = createResolvedState();
  if (isNullish(valueOrFn)) {
    return result;
  }
  if (typeof valueOrFn === 'function') {
    valueOrFn = valueOrFn(theme);
  }
  if (isNullish(valueOrFn)) {
    return result;
  }
  if (Array.isArray(valueOrFn)) {
    for (const item of valueOrFn) {
      mergeResolvedSx(result, resolveSx(item, props, theme, context));
    }
    return result;
  }

  const entries = createPseudoResolver(theme)(valueOrFn);
  const styleProps = Object.fromEntries(entries);
  const breakpoints = theme.breakpoints;

  for (const [key, valueOrFn] of entries) {
    // Functional pseudo selectors may expand into entries whose own values
    // are callbacks, so resolve and validate those just like other props.
    const value = typeof valueOrFn === 'function' ? valueOrFn(theme) : valueOrFn;
    if (Array.isArray(value)) {
      throw new TypeError(`Array values are not supported for sx property "${key}". Use named breakpoint maps or explicit queries instead.`);
    }
    if (isNullish(value)) {
      continue;
    }

    if (isResponsiveObjectValue(key, value, breakpoints)) {
      const names = Object.keys(value);
      // Resolve both base spellings before any generated query, irrespective
      // of their position within the author's map.
      const orderedNames = [
        ...names.filter(name => RESPONSIVE_OBJECT_BASE_KEYS.has(name)),
        ...names.filter(name => !RESPONSIVE_OBJECT_BASE_KEYS.has(name)),
      ];
      for (const name of orderedNames) {
        const isBase = RESPONSIVE_OBJECT_BASE_KEYS.has(name);
        if (!isBase && !Object.prototype.hasOwnProperty.call(breakpoints?.values ?? {}, name)) {
          continue;
        }
        const item = typeof value[name] === 'function' ? value[name](theme) : value[name];
        if (isNullish(item)) {
          continue;
        }
        if (Array.isArray(item)) {
          throw new TypeError(`Array values are not supported for sx property "${key}". Use named breakpoint maps or explicit queries instead.`);
        }
        const declaration = resolveDeclaration(key, item, styleProps, props, theme);
        if (isBase) {
          assignDeclarations(result, declaration);
          continue;
        }
        if (!context.mediaOrder) {
          context.mediaOrder = [...new Set(breakpoints.keys.map(breakpoint => breakpoints.gte(breakpoint)))];
        }
        const media = breakpoints.gte(name);
        assignDeclarations(getRule(result, media, 'generated'), declaration);
      }
      continue;
    }

    if (isPlainObject(value)) {
      const rule = getRule(result, key, 'explicit');
      mergeResolvedSx(rule, resolveSx(value, props, theme, context));
      continue;
    }

    assignDeclarations(result, resolveDeclaration(key, value, styleProps, props, theme));
  }

  return result;
};

const sx = (valueOrFn) => (props = {}) => {
  const theme = { ...(props.theme || props) };
  const context = {};
  return finalizeResolvedSx(resolveSx(valueOrFn, props, theme, context), context);
};

export default sx;
