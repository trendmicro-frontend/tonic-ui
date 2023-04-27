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

const sx = (styleConfig) => (props = {}) => {
  if (Array.isArray(styleConfig)) {
    return styleConfig.reduce((acc, config) => ({
      ...acc,
      ...sx(config)(props),
    }), {});
  }

  const theme = {
    ...(props.theme || props),
  };
  const styleObject = (typeof styleConfig === 'function') ? styleConfig(theme) : styleConfig;
  const styles = responsive(styleObject)(theme);

  let result = {};
  for (const key in styles) {
    if (!Object.prototype.hasOwnProperty.call(styles, key)) {
      continue;
    }

    const styleValue = styles[key];
    const value = (typeof styleValue === 'function') ? styleValue(theme) : styleValue;

    if (value && typeof value === 'object') {
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
    const styleFunction = system.config[key];
    if (typeof styleFunction !== 'function') {
      // pass them through to the result for unknown props
      result[key] = value;
      continue;
    }

    const scale = get(theme, styleFunction.scale, styleFunction.defaultScale);
    const propsWithTheme = {
      ...styles,
      theme, // include "theme" in props
    };
    const styleResult = styleFunction(scale, value, propsWithTheme); // `sx` is a style function

    result = {
      ...result,
      ...styleResult,
    };
  }

  return result;
};

export default sx;
