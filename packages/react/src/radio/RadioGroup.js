import memoize from 'micro-memoize';
import React, { useEffect, useState } from 'react';
import config from '../shared/config';
import runIfFn from '../utils/runIfFn';
import useAutoId from '../utils/useAutoId';
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
  const defaultId = useAutoId();
  name = name ?? `${config.name}:RadioGroup-${defaultId}`;

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

  const context = getMemoizedState({
    disabled,
    name,
    onChange: handleChange,
    size,
    value: state.value,
    variantColor,
  });

  return (
    <RadioGroupContext.Provider value={context}>
      {runIfFn(children, context)}
    </RadioGroupContext.Provider>
  );
};

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
