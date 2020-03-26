import React, { forwardRef } from 'react';
import PseudoBox from '../PseudoBox';
import { baseProps } from './styles';

/**
 * `InputBase` does not have appearance settings including default color, padding, outline, and border
 */
const InputBase = forwardRef((
  {
    'aria-invalid': invalid,
    children,
    ...rest
  },
  ref,
) => {
  const { disabled, readOnly, required } = rest;

  return (
    <PseudoBox
      ref={ref}
      as="input"
      type="text"
      aria-disabled={disabled}
      aria-invalid={invalid}
      aria-readonly={readOnly}
      aria-required={required}
      {...baseProps}
      {...rest}
    >
      {children}
    </PseudoBox>
  );
});

InputBase.displayName = 'InputBase';

export default InputBase;
