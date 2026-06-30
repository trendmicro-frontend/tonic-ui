import { useMergeRefs } from '@tonic-ui/react-hooks';
import { callEventHandlers, isNullish } from '@tonic-ui/utils';
import React, { forwardRef, useCallback, useRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { VisuallyHidden } from '../visually-hidden';
import SwitchControlBox from './SwitchControlBox';
import { defaultSize, defaultVariantColor } from './constants';
import { useSwitchStyle } from './styles';

/**
 * @typedef {Object} SwitchProps
 * @property {boolean} [checked] - The switch will be selected. Use the `onChange` prop to update the state for a controlled component.
 * @property {React.ReactNode} [children] - The content within the switch component.
 * @property {boolean} [defaultChecked] - The switch will be selected initially.
 * @property {boolean} [disabled] - Disables the switch and prevents user interaction.
 * @property {string} [id] - The `id` attribute of the input field.
 * @property {React.InputHTMLAttributes<HTMLInputElement>} [inputProps] - Additional props to be applied to the input element.
 * @property {React.RefObject<HTMLInputElement>} [inputRef] - A `ref` to access the input element.
 * @property {string} [name] - The name of the switch input when used within a form.
 * @property {React.FocusEventHandler<HTMLInputElement>} [onBlur] - A callback function invoked when the switch loses focus.
 * @property {React.ChangeEventHandler<HTMLInputElement>} [onChange] - A callback function invoked when the state of the switch changes.
 * @property {React.MouseEventHandler<HTMLInputElement>} [onClick] - A callback function invoked when the switch is clicked.
 * @property {React.FocusEventHandler<HTMLInputElement>} [onFocus] - A callback function invoked when the switch receives focus.
 * @property {boolean} [readOnly] - When true, the switch is focusable but cannot be toggled. Mutually exclusive with `disabled` (which wins when both are set).
 * @property {'sm' | 'md' | 'lg'} [size='md'] - The size of the switch.
 * @property {string | boolean} [value] - The value of the switch input. This is the return value for form submissions.
 * @property {string} [variantColor='blue'] - The color of the switch when it is selected. The color should be one of the color keys in the theme (for example, 'green', 'red')
 */

/**
 * @type {ForwardRefComponent<'label', SwitchProps>}
 */
const Switch = forwardRef((inProps, ref) => {
  const {
    checked,
    children,
    defaultChecked,
    disabled,
    id,
    inputProps,
    inputRef: inputRefProp,
    name,
    onBlur,
    onChange,
    onClick,
    onFocus,
    readOnly,
    size = defaultSize,
    value,
    variantColor = defaultVariantColor,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Switch' });
  const inputRef = useRef();
  const combinedInputRef = useMergeRefs(inputRefProp, inputRef);
  const styleProps = useSwitchStyle({ disabled, readOnly });
  const preventDefaultIfReadOnly = useCallback((event) => {
    if (readOnly) {
      event.preventDefault();
    }
  }, [readOnly]);

  return (
    <Box
      as="label"
      ref={ref}
      {...styleProps}
      {...rest}
    >
      <VisuallyHidden
        as="input"
        aria-readonly={readOnly ? true : undefined}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        id={id}
        name={name}
        onBlur={onBlur}
        onChange={callEventHandlers(preventDefaultIfReadOnly, onChange)}
        onClick={callEventHandlers(preventDefaultIfReadOnly, onClick)}
        onFocus={onFocus}
        ref={combinedInputRef}
        role="switch"
        type="checkbox"
        value={value}
        {...inputProps}
      />
      <SwitchControlBox
        size={size}
        variantColor={variantColor}
      />
      {!isNullish(children) && (
        <Box
          ml="2x"
          userSelect="none"
          color={disabled ? 'text.disabled' : 'text.accent'}
        >
          {children}
        </Box>
      )}
    </Box>
  );
});

Switch.displayName = 'Switch';

export default Switch;
