import { runIfFn } from '@tonic-ui/utils';
import { ensureArray } from 'ensure-type';
import memoize from 'micro-memoize';
import React, { useCallback, useEffect, useState } from 'react';
import { useDefaultProps } from '../default-props';
import config from '../shared/config';
import useAutoId from '../utils/useAutoId';
import { CheckboxGroupContext } from './context';

const getMemoizedState = memoize(state => ({ ...state }));

const uniq = (values) => [...new Set(values)];

const CheckboxGroup = (inProps) => {
  const {
    children,
    defaultValue,
    disabled,
    name: nameProp,
    onChange: onChangeProp,
    size,
    value: valueProp,
    variantColor,
  } = useDefaultProps({ props: inProps, name: 'CheckboxGroup' });
  const defaultId = useAutoId();
  const name = nameProp ?? `${config.name}:CheckboxGroup-${defaultId}`;

  const [state, setState] = useState({
    value: ensureArray(valueProp ?? defaultValue),
  });

  useEffect(() => {
    if (valueProp !== undefined) {
      setState({ value: ensureArray(valueProp) });
    }
  }, [valueProp]);

  const onChange = useCallback(({ checked, value }) => {
    const isControlled = (valueProp !== undefined);
    const nextValue = !!checked
      ? uniq(state.value.concat(ensureArray(value))) // Add the newly checked value, skip nullish, and ensure uniqueness
      : state.value.filter(v => (v !== value)); // Remove the unchecked value from the current selection

    if (isControlled) {
      setState({ value: ensureArray(valueProp) });
    } else {
      setState({ value: nextValue });
    }

    if (typeof onChangeProp === 'function') {
      onChangeProp(nextValue);
    }
  }, [onChangeProp, state.value, valueProp]);

  const context = getMemoizedState({
    disabled,
    name,
    onChange,
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
