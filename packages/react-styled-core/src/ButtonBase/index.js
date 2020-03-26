import React, { forwardRef } from 'react';
import PseudoBox from '../PseudoBox';
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
    <PseudoBox
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
    </PseudoBox>
  );
});

ButtonBase.displayName = 'ButtonBase';

export default ButtonBase;
