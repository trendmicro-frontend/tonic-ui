import React, { forwardRef } from 'react';
import PseudoBox from '../PseudoBox';

const ButtonBase = forwardRef(
  (
    {
      disabled,
      children,
      as: Comp = 'button',
      type = 'button',
      ...rest
    },
    ref,
  ) => {
    // `ButtonBase` has no any styles. (no border, no padding, no shadow, no background)
    const removedStyles = {
      bg: 'transparent',
      border: 'none',
      outline: 'none',
      padding: 0,
    };

    return (
      <PseudoBox
        disabled={disabled}
        aria-disabled={disabled}
        ref={ref}
        as={Comp}
        type={type}
        {...removedStyles}
        {...rest}
      >
        { children }
      </PseudoBox>
    );
  },
);

ButtonBase.displayName = 'ButtonBase';

export default ButtonBase;
