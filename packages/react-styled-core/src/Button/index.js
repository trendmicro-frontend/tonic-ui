import React, { forwardRef } from 'react';
import useButtonStyle from './styles';
import PseudoBox from '../PseudoBox';

const Button = forwardRef(
  (
    {
      disabled,
      borderRadius,
      children,
      as: Comp = 'button',
      variant = 'solid',
      variantColor,
      type = 'button',
      size = 'md',
      colorMode,
      ...rest
    },
    ref,
  ) => {
    const buttonStyleProps = useButtonStyle({
      borderRadius,
      color: variantColor,
      colorMode,
      size,
      variant,
    });

    return (
      <PseudoBox
        disabled={disabled}
        aria-disabled={disabled}
        ref={ref}
        as={Comp}
        type={type}
        {...buttonStyleProps}
        {...rest}
      >
        { children }
      </PseudoBox>
    );
  },
);

Button.displayName = 'Button';

export default Button;
