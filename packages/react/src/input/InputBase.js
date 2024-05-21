import { ariaAttr } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useInputBaseStyle } from './styles';

/**
 * `InputBase` does not have appearance settings including default color, padding, outline, and border
 */
const InputBase = forwardRef((
  {
    children,
    error,
    ...rest
  },
  ref,
) => {
  const ariaProps = {
    'aria-disabled': ariaAttr(rest.disabled),
    'aria-invalid': ariaAttr(error),
    'aria-readonly': ariaAttr(rest.readOnly),
    'aria-required': ariaAttr(rest.required),
  };
  const styleProps = useInputBaseStyle();

  return (
    <Box
      as="input"
      ref={ref}
      {...ariaProps}
      {...styleProps}
      {...rest}
    >
      {children}
    </Box>
  );
});

InputBase.displayName = 'InputBase';

export default InputBase;
