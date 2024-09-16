/**
 * Add keys, values of `defaultProps` that does not exist in `props`
 * @param defaultProps
 * @param props
 * @returns resolved props
 */
const resolveProps = (defaultProps, props) => {
  const output = { ...props };

  for (const [propName, defaultValue] of Object.entries(defaultProps)) {
    if (propName === 'slots') {
      output[propName] = {
        ...(defaultValue || {}),
        ...(output[propName] || {}),
      };
    } else if (propName === 'slotProps') {
      const defaultSlotProps = defaultValue;
      const slotProps = props[propName];

      if (!slotProps) {
        output[propName] = defaultSlotProps || {};
      } else if (!defaultSlotProps) {
        output[propName] = slotProps;
      } else {
        output[propName] = { ...slotProps };

        for (const slotKey in defaultSlotProps) {
          if (Object.prototype.hasOwnProperty.call(defaultSlotProps, slotKey)) {
            const slotPropName = slotKey;
            output[propName][slotPropName] = resolveProps(defaultSlotProps[slotPropName], slotProps[slotPropName]);
          }
        }
      }
    } else if (output[propName] === undefined) {
      output[propName] = defaultValue;
    }
  }

  return output;
};

export default resolveProps;
