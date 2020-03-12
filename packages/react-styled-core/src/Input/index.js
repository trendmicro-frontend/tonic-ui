import React, { forwardRef } from 'react';
import PseudoBox from '../PseudoBox';
import useInputStyleProps from './useInputStyleProps';

const Input = forwardRef((
  {
    size,
    variant,
    ...rest
  },
  ref,
) => {
  const inputStyleProps = useInputStyleProps({ size, variant });

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
