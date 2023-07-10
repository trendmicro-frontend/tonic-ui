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
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    checked,
    children,
    defaultChecked,
    disabled,
    id,
    indeterminate,
    inputProps,
    name,
    onBlur,
    onChange,
    onClick,
    onFocus,
    readOnly,
    size,
    value,
    variantColor,
    ...rest
  },
  ref,
) => {
  const checkboxGroupContext = useCheckboxGroup();
  const _defaultChecked = defaultChecked ? undefined : checked;
  checked = readOnly ? Boolean(checked) : _defaultChecked;

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
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        as="input"
        checked={checked}
        data-indeterminate={dataAttr(indeterminate)}
        defaultChecked={defaultChecked}
        disabled={disabled}
        id={id}
        name={name}
        onBlur={onBlur}
        onChange={readOnly ? undefined : onChange}
        onClick={readOnly ? undefined : onClick}
        onFocus={onFocus}
        readOnly={readOnly}
        ref={ref}
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
          opacity={disabled || readOnly ? 0.28 : 1}
        >
          {children}
        </Box>
      )}
    </Box>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
