import ensureArray from '../utils/ensure-array';
import get from '../utils/get';
import createParser from './createParser';

const getValue = (n, scale) => get(scale, n, n);

const system = (args = {}) => {
  const config = {};

  Object.keys(args).forEach(key => {
    const conf = args[key];
    if (conf === true) {
      // shortcut definition
      config[key] = createStyleFunction({
        property: key,
        scale: key,
      });
      return;
    }
    if (typeof conf === 'function') {
      config[key] = conf;
      return;
    }
    config[key] = createStyleFunction(conf);
  });

  const parser = createParser(config);
  return parser;
};

const createStyleFunction = ({
  properties,
  property,
  scale,
  transform = getValue,
  defaultScale,
}) => {
  properties = ensureArray(properties).concat(ensureArray(property));

  const sx = (value, scale, _props) => {
    const result = {};
    const n = transform(value, scale, _props);
    if (n !== null && n !== undefined) {
      properties.forEach(prop => {
        result[prop] = n;
      });
    }
    return result;
  };
  sx.scale = scale;
  sx.defaults = defaultScale;
  return sx;
};

export default system;
