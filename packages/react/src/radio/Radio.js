import _get from 'lodash.get';
import chainedFunction from 'chained-function';
import React, { forwardRef } from 'react';
import { Box, ControlBox } from '../box';
import { useTheme } from '../theme';
import { VisuallyHidden } from '../visually-hidden';
import { useRadioStyle } from './styles';
import useRadioGroup from './useRadioGroup';

const sizes = {
  lg: '6x',
  md: '4x',
  sm: '3x',
};

const defaultSize = 'md';
const defaultVariantColor = 'blue';

const Radio = forwardRef((
  {
    checked,
    children,
    defaultChecked,
    disabled,
    id,
    name,
    size,
    value,
    variantColor,
    onChange,
    onClick,
    onBlur,
    onFocus,
    ...rest
  },
  ref,
) => {
  const radioGroupContext = useRadioGroup();

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
    disabled = radioGroupDisabled || disabled;
    name = radioGroupName ?? name;
    onChange = chainedFunction(
      onChange,
      radioGroupOnChange,
    );
    // Use the default value if the value is null or undefined
    size = (size ?? radioGroupSize) ?? defaultSize;
    variantColor = (variantColor ?? radioGroupVariantColor) ?? defaultVariantColor;
  } else {
    // Use the default value if the value is null or undefined
    size = size ?? defaultSize;
    variantColor = variantColor ?? defaultVariantColor;
  }

  const { sizes: themeSizes } = useTheme();
  const _size = sizes[size];
  const themeSize = _get(themeSizes, _size);
  const iconSize = `calc(${themeSize} / 2)`;
  const styleProps = useRadioStyle({
    color: variantColor,
    width: _size,
    height: _size,
  });

  return (
    <Box
      as="label"
      display="inline-flex"
      verticalAlign="top"
      htmlFor={id}
      alignItems="center"
      cursor={disabled ? 'not-allowed' : 'pointer'}
      {...rest}
    >
      <VisuallyHidden
        as="input"
        type="radio"
        id={id}
        ref={ref}
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        onChange={onChange}
        onClick={onClick}
        onBlur={onBlur}
        onFocus={onFocus}
        checked={checked}
        disabled={disabled}
      />
      <ControlBox
        type="radio"
        {...styleProps}
      >
        <Box
          backgroundColor="currentColor"
          borderRadius="circle"
          display="inline-flex"
          width={iconSize}
          height={iconSize}
        />
      </ControlBox>
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

Radio.displayName = 'Radio';

export default Radio;
