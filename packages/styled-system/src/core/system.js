import ensureArray from '../utils/ensure-array';
import get from '../utils/get';
import parser from './parser';

const getValue = (n, scale) => get(scale, n, n);

const system = (config, options) => {
  const group = options?.group;
  const styleConfig = Object.keys({ ...config }).reduce((acc, key) => {
    const value = config[key];

    if (typeof value === 'function') {
      acc[key] = value;
      return acc;
    }

    if (value === true) {
      // shortcut definition
      acc[key] = createStyleFunction({
        group,
        property: key,
      });
      return acc;
    }

    acc[key] = createStyleFunction({
      group,
      ...value,
    });
    return acc;
  }, {});

  return parser(styleConfig);
};

const createStyleFunction = ({
  group,
  properties,
  property,
  alias,
  scale,
  defaultScale,
  transform = getValue,
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
  sx.group = group;
  sx.originalProperties = properties;
  sx.alias = alias;
  sx.scale = scale;
  sx.defaultScale = defaultScale;
  return sx;
};

export default system;
