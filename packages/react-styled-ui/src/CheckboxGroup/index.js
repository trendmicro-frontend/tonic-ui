import { ensureArray } from 'ensure-type';
import memoize from 'micro-memoize';
import React, { useEffect, useState } from 'react';
import config from '../shared/config';
import { useId } from '../utils/autoId';
import { CheckboxGroupProvider } from './context';

const getMemoizedState = memoize(state => ({ ...state }));

const CheckboxGroup = ({
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
  name = name ?? `${config.name}:checkbox-${defaultId}`;

  const [state, setState] = useState({
    value: ensureArray(valueProp ?? defaultValue),
  });

  useEffect(() => {
    if (valueProp !== undefined) {
      setState({ value: ensureArray(valueProp) });
    }
  }, [valueProp]);

  const handleChange = event => {
    const checkbox = {
      checked: event.target.checked,
      value: event.target.value,
    };

    const nextValue = !!(checkbox.checked)
      ? state.value.concat(ensureArray(checkbox.value)) // expect value to be neither null nor undefined
      : state.value.filter(v => (v !== checkbox.value)); // filter out unchecked values

    if (valueProp !== undefined) {
      setState({ value: ensureArray(valueProp) });
    } else {
      setState({ value: nextValue });
    }

    if (typeof onChange === 'function') {
      onChange(nextValue, event);
    }
  };

  const checkboxGroupState = getMemoizedState({
    disabled,
    name,
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
