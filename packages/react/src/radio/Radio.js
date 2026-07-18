import { useEffectOnceWhen, useMergeRefs } from '@tonic-ui/react-hooks';
import { isNullish } from '@tonic-ui/utils';
import { ensureFunction } from 'ensure-type';
import React, { forwardRef, useRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { VisuallyHidden } from '../visually-hidden';
import { defaultSize, defaultVariantColor } from './constants';
import RadioControlBox from './RadioControlBox';
import useRadioGroup from './useRadioGroup';
import { useRadioStyle } from './styles';

/**
 * @template [T=string]
 * @typedef {Object} RadioProps
 * @property {boolean} [checked] - The radio button will be selected. Use the `onChange` prop to update the state for a controlled component.
 * @property {React.ReactNode} [children] - The content within the radio button component.
 * @property {boolean} [defaultChecked] - The radio button will be selected initially.
 * @property {boolean} [disabled] - Disables the radio button and prevents user interaction.
 * @property {string} [id] - The `id` attribute of the input field.
 * @property {React.InputHTMLAttributes<HTMLInputElement>} [inputProps] - Additional props to be applied to the input element.
 * @property {React.RefObject<HTMLInputElement>} [inputRef] - A `ref` to access the input element.
 * @property {string} [name] - The name of the input field in a series of radio buttons. The name is useful for form submissions.
 * @property {React.FocusEventHandler<HTMLInputElement>} [onBlur] - A callback function invoked when the radio button loses focus.
 * @property {React.ChangeEventHandler<HTMLInputElement>} [onChange] - A callback function invoked when the state of the radio button changes.
 * @property {React.MouseEventHandler<HTMLInputElement>} [onClick] - A callback function invoked when the radio button is clicked.
 * @property {React.FocusEventHandler<HTMLInputElement>} [onFocus] - A callback function invoked when the radio button receives focus.
 * @property {'sm' | 'md' | 'lg'} [size='md'] - The size of the radio button.
 * @property {T} [value] - The value of the radio button.
 * @property {string} [variantColor='blue'] - The color of the radio button when it is selected. The color should be one of the color keys in the theme (for example, 'green', 'red')
 */

/**
 * @type {{ <T = string>(props: StyleProps & RadioProps<T> & React.RefAttributes<HTMLElement>): React.ReactElement | null; displayName?: string }}
 */
const Radio = forwardRef((inProps, ref) => {
  const {
    checked: checkedProp,
    children,
    defaultChecked,
    disabled: disabledProp,
    id,
    inputProps,
    inputRef: inputRefProp,
    name: nameProp,
    onBlur,
    onChange: onChangeProp,
    onClick,
    onFocus,
    size: sizeProp,
    value,
    variantColor: variantColorProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Radio' });

  let checked = checkedProp;
  let disabled = disabledProp;
  let name = nameProp;
  let onChange = onChangeProp;
  let size = sizeProp;
  let variantColor = variantColorProp;

  const inputRef = useRef();
  const combinedInputRef = useMergeRefs(inputRefProp, inputRef);
  const radioGroupContext = useRadioGroup();
  let warningMessage = '';

  if (radioGroupContext) {
    const {
      disabled: radioGroupDisabled,
      name: radioGroupName,
      size: radioGroupSize,
      value: radioGroupValue,
      variantColor: radioGroupVariantColor,
      onChange: radioGroupOnChange,
    } = { ...radioGroupContext };

    if (radioGroupValue !== undefined) {
      checked = (radioGroupValue === value);
    }
    disabled = (disabled ?? radioGroupDisabled);
    const isNameConflict = !isNullish(name) && !isNullish(radioGroupName) && (name !== radioGroupName);
    if (isNameConflict) {
      warningMessage = `Warning: The \`Radio\` has a \`name\` prop ("${name}") that conflicts with the \`RadioGroup\`'s \`name\` prop ("${radioGroupName}")`;
    }
    name = (name ?? radioGroupName);
    onChange = (event) => {
      ensureFunction(onChangeProp)(event);

      // Pass the radio value to the group handler
      ensureFunction(radioGroupOnChange)({ value });
    };
    // Use the default value if the value is null or undefined
    size = (size ?? radioGroupSize) ?? defaultSize;
    variantColor = (variantColor ?? radioGroupVariantColor) ?? defaultVariantColor;
  } else {
    // Use the default value if the value is null or undefined
    size = size ?? defaultSize;
    variantColor = variantColor ?? defaultVariantColor;
  }

  useEffectOnceWhen(() => {
    if (process.env.NODE_ENV !== 'production' && !!warningMessage) {
      // Log the warning message only once
      console.error(warningMessage);
    }
  }, [!!warningMessage]);

  const styleProps = useRadioStyle({ disabled });

  return (
    <Box
      as="label"
      ref={ref}
      {...styleProps}
      {...rest}
    >
      <VisuallyHidden
        as="input"
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        id={id}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        onClick={onClick}
        onFocus={onFocus}
        ref={combinedInputRef}
        type="radio"
        value={value}
        {...inputProps}
      />
      <RadioControlBox
        size={size}
        variantColor={variantColor}
      />
      {!isNullish(children) && (
        <Box
          ml="2x"
          userSelect="none"
          color={disabled ? 'text.disabled' : 'text.primary'}
        >
          {children}
        </Box>
      )}
    </Box>
  );
});

Radio.displayName = 'Radio';

export default Radio;
