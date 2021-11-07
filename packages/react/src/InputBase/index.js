import React, { forwardRef } from 'react';
import Box from '../Box';
import { baseProps } from './styles';

/**
 * `InputBase` does not have appearance settings including default color, padding, outline, and border
 */
const InputBase = forwardRef((
  {
    children,
    ...rest
  },
  ref,
) => {
  const { disabled, readOnly, required, isInvalid } = rest;

  return (
    <Box
      ref={ref}
      as="input"
      aria-disabled={disabled}
      aria-readonly={readOnly}
      aria-required={required}
      aria-invalid={isInvalid}
      {...baseProps}
      {...rest}
    >
      {children}
    </Box>
  );
});

InputBase.displayName = 'InputBase';

export default InputBase;
