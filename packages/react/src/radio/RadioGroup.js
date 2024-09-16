import { runIfFn } from '@tonic-ui/utils';
import memoize from 'micro-memoize';
import React, { useEffect, useState } from 'react';
import { useDefaultProps } from '../default-props';
import config from '../shared/config';
import useAutoId from '../utils/useAutoId';
import { RadioGroupContext } from './context';

const getMemoizedState = memoize(state => ({ ...state }));

const RadioGroup = (inProps) => {
  const {
    children,
    defaultValue,
    disabled,
    name: nameProp,
    size,
    value: valueProp,
    variantColor,
    onChange,
  } = useDefaultProps({ props: inProps, name: 'RadioGroup' });
  const defaultId = useAutoId();
  const name = nameProp ?? `${config.name}:RadioGroup-${defaultId}`;

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
