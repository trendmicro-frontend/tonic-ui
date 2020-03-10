import React, { forwardRef } from 'react';
import Box from '../Box';
import ControlBox from '../ControlBox';
import useColorMode from '../useColorMode';
import VisuallyHidden from '../VisuallyHidden';
import radioStyles from './styles';

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

const Radio = forwardRef(
  (
    {
      id,
      name,
      value,

      defaultChecked,
      checked,
      disabled,

      variantColor = 'blue',
      size = 'md',

      onChange,
      onBlur,
      onFocus,

      children,
      ...rest
    },
    ref,
  ) => {
    const { colorMode } = useColorMode();
    const styleProps = radioStyles({ color: variantColor, size, colorMode });
    const _size = sizes[size];
    const _iconSize = iconSizes[size];

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
