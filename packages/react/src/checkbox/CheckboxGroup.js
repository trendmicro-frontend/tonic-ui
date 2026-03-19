import { useId } from '@tonic-ui/react-hooks';
import { runIfFn } from '@tonic-ui/utils';
import { ensureArray } from 'ensure-type';
import React, { useCallback, useEffect, useState } from 'react';
import { useDefaultProps } from '../default-props';
import useShallowMemo from '../utils/useShallowMemo';
import config from '../shared/config';
import { CheckboxGroupContext } from './context';


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
  const shallowMemo = useShallowMemo();
  const defaultId = useId();
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
      ? [...state.value, value] // Add the newly checked value
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

  const context = shallowMemo({
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
