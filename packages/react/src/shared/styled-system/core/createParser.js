import get from '../utils/get';
import mergeObject from '../utils/merge-object';
import sortObject from '../utils/sort-object';

const defaultBreakpoints = [];
const createMediaQuery = n => `@media screen and (min-width: ${n})`;

const createParser = config => {
  const cache = {};
  const parse = props => {
    let styles = {};
    let shouldSort = false;
    const isCacheDisabled = props.theme && props.theme.disableStyledSystemCache;

    for (const key in props) {
      if (!config[key]) {
        continue;
      }

      const sx = config[key];
      const raw = props[key];
      const scale = get(props.theme, sx.scale, sx.defaults);

      if (typeof raw === 'object') {
        cache.breakpoints = (!isCacheDisabled && cache.breakpoints) || get(props.theme, 'breakpoints', defaultBreakpoints);

        if (Array.isArray(raw)) {
          cache.media = (!isCacheDisabled && cache.media) || [
            null,
            ...cache.breakpoints.map(createMediaQuery),
          ];
          styles = mergeObject(
            styles,
            parseResponsiveStyle(cache.media, sx, scale, raw, props)
          );
          continue;
        }
        if (raw !== null) {
          styles = mergeObject(
            styles,
            parseResponsiveObject(cache.breakpoints, sx, scale, raw, props)
          );
          shouldSort = true;
        }
        continue;
      }

      Object.assign(styles, sx(raw, scale, props));
    }

    if (shouldSort) {
      // sort object-based responsive styles
      styles = sortObject(styles);
    }

    return styles;
  };

  parse.config = config;
  parse.propNames = Object.keys(config);
  parse.cache = cache;

  const keys = Object.keys(config).filter(k => k !== 'config');
  if (keys.length > 1) {
    keys.forEach(key => {
      parse[key] = createParser({
        [key]: config[key],
      });
    });
  }

  return parse;
};

const parseResponsiveStyle = (mediaQueries, sx, scale, raw, _props) => {
  const styles = {};

  raw.slice(0, mediaQueries.length).forEach((value, i) => {
    const media = mediaQueries[i];
    const style = sx(value, scale, _props);
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

  for (let key in raw) {
    if (!Object.prototype.hasOwnProperty.call(raw, key)) {
      continue;
    }

    const breakpoint = breakpoints[key];
    const value = raw[key];
    const style = sx(value, scale, _props);
    if (!breakpoint) {
      Object.assign(styles, style);
    } else {
      const media = createMediaQuery(breakpoint);
      Object.assign(styles, {
        [media]: Object.assign({}, styles[media], style),
      });
    }
  }

  return styles;
};

export default createParser;
