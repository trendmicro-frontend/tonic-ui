import { ensureArray } from 'ensure-type';
import memoize from 'micro-memoize';
import React, { useEffect, useState } from 'react';
import { CheckboxGroupProvider } from './context';

const getMemoizedState = memoize(state => ({ ...state }));

const CheckboxGroup = ({
  children,
  defaultValue,
  disabled,
  size,
  value: valueProp,
  variantColor,
  onChange,
}) => {
  const [state, setState] = useState({
    value: ensureArray(valueProp ?? defaultValue),
  });
  const handleChange = event => {
    const checkbox = {
      checked: event.target.checked,
      value: event.target.value,
    };
    const nextValue = !!(checkbox.checked)
      ? state.value.concat(checkbox.value)
      : state.value.filter(v => (v !== checkbox.value));

    if (valueProp !== undefined) {
      setState({ value: ensureArray(valueProp) });
    } else {
      setState({ value: nextValue });
    }

    if (typeof onChange === 'function') {
      onChange(nextValue, event);
    }
  };

  useEffect(() => {
    if (valueProp !== undefined) {
      setState({ value: ensureArray(valueProp) });
    }
  }, [valueProp]);

  const checkboxGroupState = getMemoizedState({
    disabled,
    onChange: handleChange,
    size,
    value: state.value,
    variantColor,
  });

  return (
    <CheckboxGroupProvider value={checkboxGroupState}>
      { children }
    </CheckboxGroupProvider>
  );
};

CheckboxGroup.displayName = 'CheckboxGroup';

export default CheckboxGroup;
