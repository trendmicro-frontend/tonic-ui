import chainedFunction from 'chained-function';
import React, { forwardRef } from 'react';
import Box from '../Box';
import { useCheckboxGroup } from '../CheckboxGroup/context';
import ControlBox from '../ControlBox';
import Icon from '../Icon';
import { ensureArray } from '../utils/ensure-type';
import VisuallyHidden from '../VisuallyHidden';
import useCheckboxStyle from './styles';

const defaultSize = 'md';

const Checkbox = forwardRef(
  (
    {
      id,
      name,
      value,

      defaultChecked,
      checked,
      disabled,
      readOnly,
      indeterminate,

      variantColor = 'blue',
      size,
      iconColor,
      iconSize = '12px',

      onChange,
      onBlur,
      onFocus,

      children,
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
        size: checkboxGroupSize,
        value: checkboxGroupValue,
        variantColor: checkboxGroupVariantColor,
        onChange: checkboxGroupOnChange
      } = { ...checkboxGroupContext };
      if (checkboxGroupValue !== undefined) {
        checked = ensureArray(checkboxGroupValue).includes(value);
      }
      disabled = checkboxGroupDisabled || disabled;
      onChange = chainedFunction(
        onChange,
        checkboxGroupOnChange,
      );
      // - Use the inherited value from the checkbox group
      // - Fallback to the default value if the value is null or undefined
      size = (checkboxGroupSize ?? size) ?? defaultSize;
      variantColor = checkboxGroupVariantColor ?? variantColor;
    } else {
      // Use the default value if the value is null or undefined
      size = size ?? defaultSize;
    }

    const styleProps = useCheckboxStyle({
      color: variantColor,
      size,
      indeterminate,
    });

    return (
      <Box
        as="label"
        display="inline-flex"
        verticalAlign="top"
        alignItems="center"
        cursor={disabled || readOnly ? 'not-allowed' : 'pointer'}
        {...rest}
      >
        <VisuallyHidden
          as="input"
          type="checkbox"
          id={id}
          ref={ref}
          name={name}
          value={value}
          defaultChecked={readOnly ? undefined : defaultChecked}
          onChange={readOnly ? undefined : onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          checked={checked}
          disabled={disabled}
          readOnly={readOnly}
          data-indeterminate={indeterminate}
        />
        <ControlBox {...styleProps}>
          {/* This Box is for rendering background color of Checkbox which is focused. */}
          <Box
            position="absolute"
            top="0"
            bottom="0"
            left="0"
            right="0"
          />
          {/* The z-index is for placing icon over the above box. */}
          <Icon
            zIndex="1"
            name={indeterminate ? '_core.minus' : '_core.check'}
            size={iconSize}
            color={iconColor}
          />
        </ControlBox>
        {children && (
          <Box
            ml="2x"
            fontSize={size}
            userSelect="none"
            opacity={readOnly || disabled ? 0.32 : 1}
          >
            {children}
          </Box>
        )}
      </Box>
    );
  },
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
