import _get from 'lodash.get';
import chainedFunction from 'chained-function';
import React, { forwardRef } from 'react';
import Box from '../Box';
import ControlBox from '../ControlBox';
import { useRadioGroup } from '../RadioGroup/context';
import useTheme from '../useTheme';
import VisuallyHidden from '../VisuallyHidden';
import useRadioStyle from './styles';

const sizes = {
  lg: '6x',
  md: '4x',
  sm: '3x',
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
      } = { ...radioGroupContext };

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

    const { sizes: themeSizes } = useTheme();
    const _size = sizes[size];
    const themeSize = _get(themeSizes, _size);
    const iconSize = `calc(${themeSize} / 2)`;
    const styleProps = useRadioStyle({
      color: variantColor,
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
          type="radio"
          borderRadius="circle"
          width={_size}
          height={_size}
        >
          <Box
            bg="currentColor"
            as="span"
            borderRadius="circle"
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
  },
);

Radio.displayName = 'Radio';

export default Radio;
