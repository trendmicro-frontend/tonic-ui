import { runIfFn } from '@tonic-ui/utils';
import { ensureArray } from 'ensure-type';
import memoize from 'micro-memoize';
import React, { useEffect, useState } from 'react';
import config from '../shared/config';
import useAutoId from '../utils/useAutoId';
import { CheckboxGroupContext } from './context';

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
  const defaultId = useAutoId();
  name = name ?? `${config.name}:CheckboxGroup-${defaultId}`;

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
    <CheckboxGroupContext.Provider value={context}>
      {runIfFn(children, context)}
    </CheckboxGroupContext.Provider>
  );
};

CheckboxGroup.displayName = 'CheckboxGroup';

export default CheckboxGroup;
