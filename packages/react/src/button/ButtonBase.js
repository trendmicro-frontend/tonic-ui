import { ariaAttr } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useButtonBaseStyle } from './styles';

/**
 * `ButtonBase` does not have appearance settings including default color, padding, outline, and border
 */
const ButtonBase = forwardRef((
  {
    children,
    disabled,
    ...rest
  },
  ref,
) => {
  const styleProps = useButtonBaseStyle({ disabled });

  return (
    <Box
      ref={ref}
      aria-disabled={ariaAttr(disabled)}
      as="button"
      type="button"
      disabled={disabled}
      {...styleProps}
      {...rest}
    >
      {children}
    </Box>
  );
});

ButtonBase.displayName = 'ButtonBase';

export default ButtonBase;
