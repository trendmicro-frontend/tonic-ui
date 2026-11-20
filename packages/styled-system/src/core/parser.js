import { get, merge } from '@tonic-ui/utils';
import { createBreakpoints } from '@tonic-ui/utils/internal';

const defaultBreakpoints = createBreakpoints();

const parseResponsiveStyle = (mediaQueries, sx, scale, raw, _props) => {
  const styles = {};

  raw.slice(0, mediaQueries.length).forEach((value, i) => {
    if (value === null || value === undefined) {
      return;
    }
    const media = mediaQueries[i];
    const style = sx(scale, value, _props);
    if (!media) {
      Object.assign(styles, style);
    } else {
      Object.assign(styles, {
        [media]: Object.assign({}, styles[media], style),
      });
    }
  });

  return styles;
};

const parseResponsiveObject = (breakpoints, sx, scale, raw, _props) => {
  const styles = {};

  for (const key in raw) {
    if (!Object.prototype.hasOwnProperty.call(raw, key)) {
      continue;
    }

    const value = raw[key];
    if (value === null || value === undefined) {
      continue;
    }
    if (key === '_') {
      Object.assign(styles, sx(scale, value, _props));
    } else if (Object.prototype.hasOwnProperty.call(breakpoints.values, key)) {
      const media = breakpoints.gte(key);
      Object.assign(styles, {
        [media]: Object.assign({}, styles[media], sx(scale, value, _props)),
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

      if (typeof raw === 'object' && raw !== null) {
        if (!mediaQueries) {
          breakpoints = get(props.theme, 'breakpoints', defaultBreakpoints);
          if (!isCacheDisabled && cache.breakpoints === breakpoints && cache.media) {
            mediaQueries = cache.media;
          } else {
            mediaQueries = [null, ...breakpoints.keys.map(name => breakpoints.gte(name))];
            if (!isCacheDisabled) {
              cache.breakpoints = breakpoints;
              cache.media = mediaQueries;
            }
          }
        }

        const responsiveStyles = Array.isArray(raw)
          ? parseResponsiveStyle(mediaQueries, sx, scale, raw, props)
          : parseResponsiveObject(breakpoints, sx, scale, raw, props);
        styles = merge(styles, responsiveStyles);
        continue;
      }

      if (raw === null) {
        continue;
      }

      Object.assign(styles, sx(scale, raw, props));
    }

    if (mediaQueries) {
      const mediaSet = new Set(mediaQueries.slice(1));
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
