import memoize from 'micro-memoize';
import React, { useEffect, useState } from 'react';
import config from '../shared/config';
import { useId } from '../utils/autoId';
import { RadioGroupContext } from './context';

const getMemoizedState = memoize(state => ({ ...state }));

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
  const defaultId = useId();
  name = name ?? `${config.name}:radio-${defaultId}`;

  const [state, setState] = useState({
    value: valueProp ?? defaultValue,
  });

  useEffect(() => {
    if (valueProp !== undefined) {
      setState({ value: valueProp });
    }
  }, [valueProp]);

  const handleChange = event => {
    const nextValue = event.target.value;

    if (valueProp !== undefined) {
      setState({ value: valueProp });
    } else {
      setState({ value: nextValue });
    }

    if (typeof onChange === 'function') {
      onChange(nextValue);
    }
  };

  const radioGroupState = getMemoizedState({
    disabled,
    name,
    onChange: handleChange,
    size,
    value: state.value,
    variantColor,
  });

  return (
    <RadioGroupContext.Provider value={radioGroupState}>
      { children }
    </RadioGroupContext.Provider>
  );
};

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
