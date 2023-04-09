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
  properties: propertiesProp,
  property: propertyProp,
  alias,
  scale,
  defaultScale,
  transform = getValue,
}) => {
  const properties = [
    ...ensureArray(propertiesProp),
    ...ensureArray(propertyProp),
  ];

  /**
   * A utility function to transform style values based on a scale and apply them to a set of properties.
   *
   * @param {string|number} value - The style value to be transformed.
   * @param {object} scale - The scale used to transform the value.
   * @param {object} props - Additional props that may affect the transformation.
   *
   * @return {object} An object containing the transformed style properties.
   */
  const sx = (value, scale, props) => {
    const transformedValue = transform(value, scale, props);
    if (transformedValue === null || transformedValue === undefined) {
      return {};
    }

    const result = properties.reduce((acc, property) => {
      if (typeof transformedValue === 'object') {
        // If the transformedValue is an object, it may contain multiple style properties that need to be applied individually.
        // For example, `{ outline: 0 }` will be transformed into `{ outline: '2px solid transparent', outlineOffset: '2px' }`.
        acc[property] = transformedValue?.[property] ?? acc[property];
      } else {
        // If the transformedValue is a string or number, apply it to all the properties in the properties array.
        acc[property] = transformedValue;
      }
      return acc;
    }, {});

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
