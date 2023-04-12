import ensureArray from '../utils/ensure-array';
import { getter as getterTransform } from '../utils/transforms';
import parser from './parser';

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
  group: groupProp,
  properties: propertiesProp,
  property: propertyProp,
  alias: aliasProp,
  scale: scaleProp,
  defaultScale: defaultScaleProp,
  transform = getterTransform,
}) => {
  const properties = [
    ...ensureArray(propertiesProp),
    ...ensureArray(propertyProp),
  ];

  const context = {
    group: groupProp,
    properties: properties,
    alias: aliasProp,
    scale: scaleProp,
    defaultScale: defaultScaleProp ?? {},
  };

  /**
   * A utility function to transform style values based on a scale and apply them to a set of properties.
   *
   * @param {object} scale - The scale used to transform the value.
   * @param {string|number} value - The style value to be transformed.
   * @param {object} props - Additional props that may affect the transformation.
   *
   * @return {object} An object containing the transformed style properties.
   */
  const sx = (scale, value, props) => {
    const transformOptions = { context, props };
    const transformedValue = transform(scale, value, transformOptions);
    if (transformedValue === null || transformedValue === undefined) {
      return {};
    }

    const result = properties.reduce((acc, property) => {
      if (typeof transformedValue === 'object') {
        // If the transformed value is an object, it may contain multiple style properties that need to be applied individually.
        // For example, `{ outline: 0 }` will be transformed into `{ outline: '2px solid transparent', outlineOffset: '2px' }`.
        acc[property] = transformedValue?.[property] ?? acc[property];
      } else {
        acc[property] = transformedValue;
      }

      return acc;
    }, {});

    return result;
  };

  Object.assign(sx, { ...context });

  return sx;
};

export default system;
