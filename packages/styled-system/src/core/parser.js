import { get, merge } from '@tonic-ui/utils';
import { createBreakpoints } from '@tonic-ui/utils/internal';

const defaultBreakpoints = createBreakpoints();

const parseResponsiveObject = (breakpoints, sx, scale, raw, props, propName) => {
  const styles = {};

  for (const key in raw) {
    if (!Object.prototype.hasOwnProperty.call(raw, key)) {
      continue;
    }

    const value = raw[key];
    if (value === null || value === undefined) {
      continue;
    }
    if ((key === '_' || Object.prototype.hasOwnProperty.call(breakpoints.values, key)) && Array.isArray(value)) {
      throw new TypeError(`Responsive array values are not supported for style prop "${propName}". Use a breakpoint object with scalar values instead.`);
    }
    if (key === '_') {
      Object.assign(styles, sx(scale, value, props));
    } else if (Object.prototype.hasOwnProperty.call(breakpoints.values, key)) {
      const media = breakpoints.gte(key);
      Object.assign(styles, {
        [media]: Object.assign({}, styles[media], sx(scale, value, props)),
      });
    }
  }

  return styles;
};

const parser = config => {
  const cache = {};
  const parse = props => {
    let styles = {};
    let breakpoints;
    let mediaQueries;
    const isCacheDisabled = props.theme && props.theme.disableStyledSystemCache;

    for (const key in props) {
      if (!config[key]) {
        continue;
      }

      const sx = config[key];
      const raw = props[key];
      const scale = get(props.theme, sx.scale, sx.defaultScale);

      if (Array.isArray(raw)) {
        throw new TypeError(`Responsive array values are not supported for style prop "${key}". Use a breakpoint object with scalar values instead.`);
      }

      if (typeof raw === 'object' && raw !== null) {
        if (!mediaQueries) {
          breakpoints = get(props.theme, 'breakpoints', defaultBreakpoints);
          if (!isCacheDisabled && cache.breakpoints === breakpoints && cache.media) {
            mediaQueries = cache.media;
          } else {
            mediaQueries = breakpoints.keys.map(name => breakpoints.gte(name));
            if (!isCacheDisabled) {
              cache.breakpoints = breakpoints;
              cache.media = mediaQueries;
            }
          }
        }

        const responsiveStyles = parseResponsiveObject(breakpoints, sx, scale, raw, props, key);
        styles = merge(styles, responsiveStyles);
        continue;
      }

      if (raw === null) {
        continue;
      }

      Object.assign(styles, sx(scale, raw, props));
    }

    if (mediaQueries) {
      const mediaSet = new Set(mediaQueries);
      const orderedStyles = {};
      for (const key of Object.keys(styles)) {
        if (!mediaSet.has(key)) {
          orderedStyles[key] = styles[key];
        }
      }
      for (const media of mediaSet) {
        if (Object.prototype.hasOwnProperty.call(styles, media)) {
          orderedStyles[media] = styles[media];
        }
      }
      styles = orderedStyles;
    }

    return styles;
  };

  parse.config = config;
  parse.propNames = Object.keys(config);
  parse.cache = cache;

  const keys = Object.keys(config).filter(k => k !== 'config');
  if (keys.length > 1) {
    keys.forEach(key => {
      parse[key] = parser({
        [key]: config[key],
      });
    });
  }

  return parse;
};

export default parser;
