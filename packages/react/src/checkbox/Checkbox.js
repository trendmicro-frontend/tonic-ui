import { useEffectOnceWhen, useMergeRefs } from '@tonic-ui/react-hooks';
import { dataAttr, isNullish } from '@tonic-ui/utils';
import { ensureArray, ensureFunction } from 'ensure-type';
import React, { forwardRef, useRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { VisuallyHidden } from '../visually-hidden';
import CheckboxControlBox from './CheckboxControlBox';
import { defaultSize, defaultVariantColor } from './constants';
import useCheckboxGroup from './useCheckboxGroup';
import { useCheckboxStyle } from './styles';

/**
 * @template [T=string]
 * @typedef {Object} CheckboxProps
 * @property {boolean} [checked] - The checkbox will be selected. Use the `onChange` prop to update the state for a controlled component.
 * @property {React.ReactNode} [children] - The content within the checkbox component.
 * @property {boolean} [defaultChecked] - The checkbox will be selected initially.
 * @property {boolean} [disabled] - Disables the checkbox and prevents user interaction.
 * @property {string} [id] - The `id` attribute of the input field.
 * @property {boolean} [indeterminate] - The checkbox will be displayed in an indeterminate state. This only affects the icon shown inside the checkbox.
 * @property {React.InputHTMLAttributes<HTMLInputElement>} [inputProps] - Additional props to be applied to the input element.
 * @property {React.RefObject<HTMLInputElement>} [inputRef] - A `ref` to access the input element.
 * @property {string} [name] - The name of the input field in the checkbox. The name is useful for form submissions.
 * @property {React.FocusEventHandler<HTMLInputElement>} [onBlur] - A callback function invoked when the checkbox loses focus.
 * @property {React.ChangeEventHandler<HTMLInputElement>} [onChange] - A callback function invoked when the state of the checkbox changes.
 * @property {React.MouseEventHandler<HTMLInputElement>} [onClick] - A callback function invoked when the checkbox is clicked.
 * @property {React.FocusEventHandler<HTMLInputElement>} [onFocus] - A callback function invoked when the checkbox receives focus.
 * @property {'sm' | 'md' | 'lg'} [size='md'] - The size of the checkbox.
 * @property {T} [value] - The value of the checkbox.
 * @property {string} [variantColor='blue'] - The color of the checkbox when it is selected. The color should be one of the color keys in the theme (for example, 'green', 'red')
 */

/**
 * @type {{ <T = string>(props: StyleProps & CheckboxProps<T> & React.RefAttributes<HTMLElement>): React.ReactElement | null; displayName?: string }}
 */
const Checkbox = forwardRef((inProps, ref) => {
  const {
    checked: checkedProp,
    children,
    defaultChecked,
    disabled: disabledProp,
    id,
    indeterminate,
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
  } = useDefaultProps({ props: inProps, name: 'Checkbox' });

  let checked = checkedProp;
  let disabled = disabledProp;
  let name = nameProp;
  let onChange = onChangeProp;
  let size = sizeProp;
  let variantColor = variantColorProp;

  const inputRef = useRef();
  const combinedInputRef = useMergeRefs(inputRefProp, inputRef);
  const checkboxGroupContext = useCheckboxGroup();
  let warningMessage = '';

  if (checkboxGroupContext) {
    const {
      disabled: checkboxGroupDisabled,
      name: checkboxGroupName,
      size: checkboxGroupSize,
      value: checkboxGroupValue,
      variantColor: checkboxGroupVariantColor,
      onChange: checkboxGroupOnChange
    } = { ...checkboxGroupContext };
    if (checkboxGroupValue !== undefined) {
      checked = ensureArray(checkboxGroupValue).includes(value);
    }
    disabled = (disabled ?? checkboxGroupDisabled);
    const isNameConflict = !isNullish(name) && !isNullish(checkboxGroupName) && (name !== checkboxGroupName);
    if (isNameConflict) {
      warningMessage = `Warning: The \`Checkbox\` has a \`name\` prop ("${name}") that conflicts with the \`CheckboxGroup\`'s \`name\` prop ("${checkboxGroupName}")`;
    }
    name = name ?? checkboxGroupName;
    onChange = (event) => {
      ensureFunction(onChangeProp)(event);

      // Pass the checkbox's checked state and value to the group handler
      ensureFunction(checkboxGroupOnChange)({
        checked: event.target.checked,
        value,
      });
    };
    // Use the default value if the value is null or undefined
    size = (size ?? checkboxGroupSize) ?? defaultSize;
    variantColor = (variantColor ?? checkboxGroupVariantColor) ?? defaultVariantColor;
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

  const styleProps = useCheckboxStyle({ disabled });

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
        data-indeterminate={dataAttr(indeterminate)}
        defaultChecked={defaultChecked}
        disabled={disabled}
        id={id}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        onClick={onClick}
        onFocus={onFocus}
        ref={combinedInputRef}
        type="checkbox"
        value={value}
        {...inputProps}
      />
      <CheckboxControlBox
        indeterminate={indeterminate}
        size={size}
        variantColor={variantColor}
      />
      {!isNullish(children) && (
        <Box
          ml="2x"
          userSelect="none"
          opacity={disabled ? 0.28 : 1}
        >
          {children}
        </Box>
      )}
    </Box>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
