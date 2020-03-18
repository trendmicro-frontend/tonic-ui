import React, { forwardRef } from 'react';
import PseudoBox from '../PseudoBox';
import useInputStyleProps from './useInputStyleProps';

const Input = forwardRef((
  {
    error,
    size,
    variant,
    ...rest
  },
  ref,
) => {
  const inputStyleProps = useInputStyleProps({ error, size, variant });

  return (
    <PseudoBox
      ref={ref}
      as="input"
      {...inputStyleProps}
      {...rest}
    />
  );
});

Input.displayName = 'Input';

export default Input;
