import { useId } from '@tonic-ui/react-hooks';
import { runIfFn } from '@tonic-ui/utils';
import React, { useCallback, useEffect, useState } from 'react';
import { useDefaultProps } from '../default-props';
import useShallowMemo from '../utils/useShallowMemo';
import config from '../shared/config';
import { RadioGroupContext } from './context';

const RadioGroup = (inProps) => {
  const {
    children,
    defaultValue,
    disabled,
    name: nameProp,
    onChange: onChangeProp,
    size,
    value: valueProp,
    variantColor,
  } = useDefaultProps({ props: inProps, name: 'RadioGroup' });
  const shallowMemo = useShallowMemo();
  const defaultId = useId();
  const name = nameProp ?? `${config.name}:RadioGroup-${defaultId}`;

  const [state, setState] = useState({
    value: valueProp ?? defaultValue,
  });

  useEffect(() => {
    if (valueProp !== undefined) {
      setState({ value: valueProp });
    }
  }, [valueProp]);

  const onChange = useCallback(({ value }) => {
    const isControlled = (valueProp !== undefined);
    const nextValue = value;

    if (isControlled) {
      setState({ value: valueProp });
    } else {
      setState({ value: nextValue });
    }

    if (typeof onChangeProp === 'function') {
      onChangeProp(nextValue);
    }
  }, [onChangeProp, valueProp]);

  const context = shallowMemo({
    disabled,
    name,
    onChange,
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
