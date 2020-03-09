import React, {
  Children,
  cloneElement,
  useState,
  useRef,
  isValidElement,
} from 'react';
import { useId } from '../utils/autoId';
import Box from '../Box';

const CheckboxGroup = ({
  onChange,
  name,
  value: valueProp,
  defaultValue,

  size,
  spacing,
  variantColor,
  disabled,
  inline,

  children,
  ...rest
}) => {
  const [values, setValues] = useState(defaultValue || []);
  const { current: isControlled } = useRef(valueProp != null);
  const _values = isControlled ? valueProp : values;

  const _onChange = event => {
    const { checked, value } = event.target;
    let newValues;
    if (checked) {
      newValues = [..._values, value];
    } else {
      newValues = _values.filter(val => val !== value);
    }

    !isControlled && setValues(newValues);
    onChange && onChange(newValues);
  };

  // If no name is passed, we'll generate a random, unique name
  const fallbackName = `checkbox-${useId()}`;
  const _name = name || fallbackName;

  const clones = Children.map(children, (child, index) => {
    if (!isValidElement(child)) {
      return null;
    }

    const isLastCheckbox = (children.length === index + 1);
    const defaultSpacing = spacing || (inline ? '6x' : '1x');
    const spacingProps = inline ? { mr: defaultSpacing } : { mb: defaultSpacing };

    return (
      <Box
        display={inline ? 'inline-block' : 'block'}
        {...(!isLastCheckbox && spacingProps)}
      >
        {cloneElement(child, {
          size: size,
          variantColor: variantColor,
          name: `${_name}-${index}`,
          onChange: _onChange,
          checked: _values.includes(child.props.value),
          disabled: disabled,
        })}
      </Box>
    );
  });

  return (
    <Box role="group" {...rest}>
      {clones}
    </Box>
  );
};

export default CheckboxGroup;
