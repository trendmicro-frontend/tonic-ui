import React, { useState, useRef } from 'react';
import { useId } from '../utils/autoId';
import { RadioGroupProvider } from './context';

const RadioGroup = ({
  children,
  defaultValue,
  disabled,
  name,
  size,
  value: valueProp,
  variantColor,
  onChange,
}) => {
  const { current: isControlled } = useRef(valueProp != null);
  const [value, setValue] = useState(defaultValue || null);
  const _value = isControlled ? valueProp : value;
  const _onChange = event => {
    if (!isControlled) {
      setValue(event.target.value);
    }
    if (onChange) {
      onChange(event, event.target.value);
    }
  };
  // If no name is passed, we'll generate a random, unique name
  const fallbackName = `radio-${useId()}`;
  const _name = name || fallbackName;
  const state = {
    disabled: disabled,
    name: _name,
    onChange: _onChange,
    size: size,
    value: _value,
    variantColor: variantColor,
  };

  return (
    <RadioGroupProvider value={state}>
      { children }
    </RadioGroupProvider>
  );
};

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
