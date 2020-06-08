import React, { forwardRef } from 'react';
import PseudoBox from '../PseudoBox';
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
    <PseudoBox
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
    </PseudoBox>
  );
});

InputBase.displayName = 'InputBase';

export default InputBase;
