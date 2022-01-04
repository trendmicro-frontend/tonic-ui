import system from './system';
import ensureArray from './utils/ensure-array';
import get from './utils/get';

const defaultBreakpoints = [];

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

const sx = args => (props = {}) => {
  const theme = {
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

    if (val && typeof val === 'object') {
      result[key] = sx(val)(theme);
      continue;
    }

    const _sx = system.config[key];
    if (typeof _sx !== 'function') {
      // pass them through to the result for unknown props
      result[key] = val;
      continue;
    }

    const _scale = get(theme, _sx.scale, _sx.defaultScale);
    const _props = {
      ...styles,
      theme, // include "theme" in props
    };
    const _result = _sx(val, _scale, _props); // `sx` is a style function

    result = {
      ...result,
      ..._result,
    };
  }

  return result;
};

export default sx;
