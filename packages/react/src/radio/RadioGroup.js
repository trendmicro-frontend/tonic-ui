import { useId } from '@tonic-ui/react-hooks';
import { runIfFn } from '@tonic-ui/utils';
import React, { useCallback, useEffect, useState } from 'react';
import { useDefaultProps } from '../default-props';
import useShallowMemo from '../utils/useShallowMemo';
import config from '../shared/config';
import { RadioGroupContext } from './context';

/**
 * @template [T=string]
 * @typedef {Object} RadioGroupProps
 * @property {React.ReactNode | ((context: { disabled?: boolean; name: string; onChange: (value: T) => void; size?: 'sm' | 'md' | 'lg'; value: T; variantColor?: string }) => React.ReactNode)} [children] - A function child can be used intead of a React element. This function is called with the context object.
 * @property {T} [defaultValue] - The default value of the radio group.
 * @property {boolean} [disabled] - All radios will be disabled.
 * @property {string} [name] - The name used to reference the value of the control. If you don't provide this prop, it falls back to a randomly generated name.
 * @property {(value: T) => void} [onChange] - A callback called when the state of the radio changes.
 * @property {'sm' | 'md' | 'lg'} [size='md'] - The size (width and height) of the radio.
 * @property {T} [value] - The current selected value of the radio group.
 * @property {string} [variantColor] - The color of the radio when it's checked. This should be one of the color keys in the theme (e.g. 'green', 'red').
 */

/**
 * @type {{ <T = string>(props: StyleProps & RadioGroupProps<T>): React.ReactElement | null; displayName?: string }}
 */
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
