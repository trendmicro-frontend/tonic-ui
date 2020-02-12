import React, { forwardRef } from 'react';
import PseudoBox from '../PseudoBox';

const ButtonBase = forwardRef((
  {
    disabled,
    children,
    as: Comp = 'button',
    type = 'button',
    ...rest
  },
  ref,
) => {
  // The base button does not have appearance including default color, padding, outline, and border settings
  const baseStyleProps = {
    bg: 'transparent',
    border: 'none',
    outline: 0,
    padding: 0,
    cursor: 'pointer',
  };

  return (
    <PseudoBox
      disabled={disabled}
      aria-disabled={disabled}
      ref={ref}
      as={Comp}
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
