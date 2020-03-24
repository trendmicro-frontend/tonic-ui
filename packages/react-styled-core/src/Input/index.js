import React, { forwardRef } from 'react';
import PseudoBox from '../PseudoBox';
import useInputStyle from './useInputStyle';

const Input = forwardRef((
  {
    'aria-invalid': invalid,
    size = 'md',
    variant = 'outline',
    ...rest
  },
  ref,
) => {
  const styleProps = useInputStyle({ invalid, size, variant });
  const { readOnly, required } = rest;

  return (
    <PseudoBox
      ref={ref}
      as="input"
      aria-invalid={invalid}
      aria-readonly={readOnly}
      aria-required={required}
      {...styleProps}
      {...rest}
    />
  );
});

Input.displayName = 'Input';

export default Input;
