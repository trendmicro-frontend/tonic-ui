import { useId } from '@tonic-ui/react-hooks';
import { runIfFn } from '@tonic-ui/utils';
import { ensureArray } from 'ensure-type';
import React, { useCallback, useEffect, useState } from 'react';
import { useDefaultProps } from '../default-props';
import config from '../shared/config';
import useShallowMemo from '../utils/useShallowMemo';
import { CheckboxGroupContext } from './context';

/**
 * @template [T=string]
 * @typedef {Object} CheckboxGroupProps
 * @property {React.ReactNode | ((context: { disabled?: boolean; name: string; onChange: (event: { checked: boolean; value: T }) => void; size?: 'sm' | 'md' | 'lg'; value: T[]; variantColor?: string }) => React.ReactNode)} [children] - A function child can be used intead of a React element. This function is called with the context object.
 * @property {T[]} [defaultValue] - The default value of the checkbox group.
 * @property {boolean} [disabled] - All checkboxes will be disabled.
 * @property {string} [name] - The name used to reference the value of the control. If you don't provide this prop, it falls back to a randomly generated name.
 * @property {(value: T[]) => void} [onChange] - A callback fired when any descendant `Checkbox` is checked or unchecked.
 * @property {'sm' | 'md' | 'lg'} [size='md'] - The size (width and height) of the checkbox.
 * @property {T[]} [value] - The current selected values of the checkbox group.
 * @property {string} [variantColor] - The color of the checkbox when it's checked. This should be one of the color keys in the theme (e.g. 'green', 'red')
 */

/**
 * @type {{ <T = string>(props: StyleProps & CheckboxGroupProps<T>): React.ReactElement | null; displayName?: string }}
 */
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
  const defaultId = useId();
  const shallowMemo = useShallowMemo();
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
