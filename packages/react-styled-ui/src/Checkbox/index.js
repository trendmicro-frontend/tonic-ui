import chainedFunction from 'chained-function';
import _get from 'lodash/get';
import React, { forwardRef } from 'react';
import Box from '../Box';
import { useCheckboxGroup } from '../CheckboxGroup/context';
import ControlBox from '../ControlBox';
import Icon from '../Icon';
import useTheme from '../useTheme';
import { ensureArray } from '../utils/ensure-type';
import VisuallyHidden from '../VisuallyHidden';
import useCheckboxStyle from './styles';

const sizes = {
  lg: '6x',
  md: '4x',
  sm: '3x',
};

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

    const { sizes: themeSizes } = useTheme();
    const _size = sizes[size];
    const themeSize = _get(themeSizes, _size);
    const iconSize = themeSize;
    const styleProps = useCheckboxStyle({
      color: variantColor,
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
        <ControlBox
          zIndex="0"
          position="relative"
          width={_size}
          height={_size}
          {...styleProps}
        >
          {/* This Box is for rendering background color of Checkbox which is focused. */}
          <Box
            zIndex="-1"
            position="absolute"
            top="0"
            bottom="0"
            left="0"
            right="0"
          />
          <Icon
            icon={indeterminate ? '_core.minus' : '_core.check'}
            size={iconSize}
            color={iconColor}
          />
        </ControlBox>
        {children && (
          <Box
            ml="2x"
            userSelect="none"
            opacity={readOnly || disabled ? 0.28 : 1}
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
