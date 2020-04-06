import chainedFunction from 'chained-function';
import React, { forwardRef } from 'react';
import Box from '../Box';
import ControlBox from '../ControlBox';
import { useRadioGroup } from '../RadioGroup/context';
import VisuallyHidden from '../VisuallyHidden';
import useRadioStyle from './styles';

const sizes = {
  lg: '20px',
  md: '16px',
  sm: '12px',
};

const iconSizes = {
  lg: '10px',
  md: '8px',
  sm: '6px',
};

const defaultSize = 'md';

const Radio = forwardRef(
  (
    {
      checked,
      children,
      defaultChecked,
      disabled,
      id,
      name,
      size,
      value,
      variantColor = 'blue',
      onChange,
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
      } = useRadioGroup();
      if (radioGroupValue !== undefined) {
        checked = (radioGroupValue === value);
      }
      disabled = radioGroupDisabled || disabled;
      onChange = chainedFunction(
        onChange,
        radioGroupOnChange,
      );
      // - Use the inherited value from the radio group
      // - Fallback to the default value if the value is null or undefined
      name = radioGroupName ?? name;
      size = (radioGroupSize ?? size) ?? defaultSize;
      variantColor = radioGroupVariantColor ?? variantColor;
    } else {
      // Use the default value if the value is null or undefined
      size = size ?? defaultSize;
    }

    const _size = sizes[size];
    const _iconSize = iconSizes[size];
    const styleProps = useRadioStyle({
      color: variantColor,
      size: _size,
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
          onBlur={onBlur}
          onFocus={onFocus}
          checked={checked}
          disabled={disabled}
        />
        <ControlBox
          {...styleProps}
          size={_size}
          type="radio"
          borderRadius="circle"
        >
          <Box bg="currentColor" as="span" borderRadius="circle" size={_iconSize} />
        </ControlBox>
        {children && (
          <Box
            ml="2x"
            fontSize={size}
            userSelect="none"
            opacity={disabled ? 0.32 : 1}
          >
            {children}
          </Box>
        )}
      </Box>
    );
  },
);

Radio.displayName = 'Radio';

export default Radio;
