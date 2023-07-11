import React, { forwardRef } from 'react';
import { Box } from '../box';
import { VisuallyHidden } from '../visually-hidden';
import SwitchControlBox from './SwitchControlBox';
import { defaultSize, defaultVariantColor } from './constants';

const Switch = forwardRef((
  {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    checked,
    children,
    defaultChecked,
    disabled,
    id,
    inputProps,
    name,
    onBlur,
    onChange,
    onClick,
    onFocus,
    size = defaultSize,
    value,
    variantColor = defaultVariantColor,
    ...rest
  },
  ref,
) => {
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
        defaultChecked={defaultChecked}
        disabled={disabled}
        id={id}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        onClick={onClick}
        onFocus={onFocus}
        ref={ref}
        type="checkbox"
        value={value}
        {...inputProps}
      />
      <SwitchControlBox
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

Switch.displayName = 'Switch';

export default Switch;
