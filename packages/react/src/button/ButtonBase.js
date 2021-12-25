import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useButtonBaseStyle } from './styles';

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
  const styleProps = useButtonBaseStyle({ disabled });

  return (
    <Box
      ref={ref}
      as="button"
      type="button"
      disabled={disabled}
      aria-disabled={disabled}
      {...styleProps}
      {...rest}
    >
      {children}
    </Box>
  );
});

ButtonBase.displayName = 'ButtonBase';

export default ButtonBase;
