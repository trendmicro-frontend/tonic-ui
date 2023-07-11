import { useMergeRefs } from '@tonic-ui/react-hooks';
import { callAll, dataAttr } from '@tonic-ui/utils';
import { ensureArray } from 'ensure-type';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { VisuallyHidden } from '../visually-hidden';
import CheckboxControlBox from './CheckboxControlBox';
import { defaultSize, defaultVariantColor } from './constants';
import useCheckboxGroup from './useCheckboxGroup';

const Checkbox = forwardRef((
  {
    checked,
    children,
    defaultChecked,
    disabled,
    id,
    indeterminate,
    inputProps,
    inputRef,
    name,
    onBlur,
    onChange,
    onClick,
    onFocus,
    size,
    value,
    variantColor,
    ...rest
  },
  ref,
) => {
  const combinedInputRef = useMergeRefs(ref, inputRef); // TODO: Move the `ref` to the outermost element in the next major version
  const checkboxGroupContext = useCheckboxGroup();

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
    disabled = checkboxGroupDisabled || disabled;
    name = checkboxGroupName ?? name;
    onChange = callAll(
      onChange,
      checkboxGroupOnChange,
    );
    // Use the default value if the value is null or undefined
    size = (size ?? checkboxGroupSize) ?? defaultSize;
    variantColor = (variantColor ?? checkboxGroupVariantColor) ?? defaultVariantColor;
  } else {
    // Use the default value if the value is null or undefined
    size = size ?? defaultSize;
    variantColor = variantColor ?? defaultVariantColor;
  }

  return (
    <Box
      as="label"
      display="inline-flex"
      verticalAlign="top"
      alignItems="center"
      cursor={disabled ? 'not-allowed' : 'pointer'}
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
      {children && (
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
