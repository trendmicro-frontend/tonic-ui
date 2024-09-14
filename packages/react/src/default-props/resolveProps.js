/**
 * Add keys, values of `defaultProps` that does not exist in `props`
 * @param defaultProps
 * @param props
 * @returns resolved props
 */
const resolveProps = (defaultProps, props) => {
  const output = { ...props };

  for (const key in defaultProps) {
    if (!Object.prototype.hasOwnProperty.call(defaultProps, key)) {
      continue;
    }

    const propName = key;

    if (propName === 'slots') {
      output[propName] = {
        ...(defaultProps[propName] || {}),
        ...(output[propName] || {}),
      };
    } else if (propName === 'slotProps') {
      const defaultSlotProps = defaultProps[propName];
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
      output[propName] = defaultProps[propName];
    }
  }

  return output;
};

export default resolveProps;
