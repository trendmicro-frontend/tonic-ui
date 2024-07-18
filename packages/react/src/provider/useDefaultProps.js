import { useContext } from 'react';
import { DefaultPropsContext } from './context';

/**
 * Add keys, values of `defaultProps` that does not exist in `props`
 * @param {object} defaultProps
 * @param {object} props
 * @returns {object} resolved props
 */
const resolveProps = (defaultProps, props) => {
  const output = { ...props };

  Object.keys(defaultProps).forEach((propName) => {
    if (propName.toString() === 'slot') {
      output[propName] = {
        ...defaultProps[propName],
        ...output[propName],
      };
    } else if (propName.toString() === 'slotProps') {
      const defaultSlotProps = defaultProps[propName] || {};
      const slotProps = props[propName];
      output[propName] = {};

      if (!slotProps || !Object.keys(slotProps)) {
        // Reduce the iteration if the slot props is empty
        output[propName] = defaultSlotProps;
      } else if (!defaultSlotProps || !Object.keys(defaultSlotProps)) {
        // Reduce the iteration if the default slot props is empty
        output[propName] = slotProps;
      } else {
        output[propName] = { ...slotProps };
        Object.keys(defaultSlotProps).forEach((slotPropName) => {
          output[propName][slotPropName] = resolveProps(defaultSlotProps[slotPropName], slotProps[slotPropName]);
        });
      }
    } else if (output[propName] === undefined) {
      output[propName] = defaultProps[propName];
    }
  });

  return output;
};

const getThemeProps = (params) => {
  const { props, name, theme } = params;

  if (!(theme?.components?.[name])) {
    return props;
  }

  const config = theme.components[name];

  if (config?.defaultProps) {
    return resolveProps(config.defaultProps, props);
  }

  if (!(config?.styleOverrides) && !(config?.variants)) {
    // no property 'defaultProps'
    return resolveProps(config, props);
  }

  return props;
};

const useDefaultProps = (props, name) => {
  const context = useContext(DefaultPropsContext);
  return getThemeProps({ props, name, theme: { components: context } });
};

export default useDefaultProps;
