import React, { forwardRef } from 'react';
import Box from '../Box';
import { baseProps } from './styles';

/**
 * `ButtonBase` does not have appearance settings including default color, padding, outline, and border
 */
const ButtonBase = forwardRef((
  {
    children,
    ...rest
  },
  ref,
) => {
  const { disabled } = rest;

  return (
    <Box
      ref={ref}
      as="button"
      type="button"
      cursor={!!disabled ? 'default' : 'pointer'}
      disabled={disabled}
      aria-disabled={disabled}
      {...baseProps}
      {...rest}
    >
      {children}
    </Box>
  );
});

ButtonBase.displayName = 'ButtonBase';

export default ButtonBase;
