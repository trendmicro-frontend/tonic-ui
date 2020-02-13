import React, { forwardRef } from 'react';
import PseudoBox from '../PseudoBox';

const ButtonBase = forwardRef((
  {
    disabled,
    children,
    as = 'button',
    type = 'button',
    ...rest
  },
  ref,
) => {
  // ButtonBase does not have appearance settings including default color, padding, outline, and border
  const baseStyleProps = {
    bg: 'transparent',
    border: 'none',
    color: 'inherit',
    cursor: disabled ? 'default' : 'pointer',
    outline: 0,
    padding: 0,
  };

  return (
    <PseudoBox
      disabled={disabled}
      aria-disabled={disabled}
      ref={ref}
      as={as}
      type={type}
      {...baseStyleProps}
      {...rest}
    >
      {children}
    </PseudoBox>
  );
});

ButtonBase.displayName = 'ButtonBase';

export default ButtonBase;
