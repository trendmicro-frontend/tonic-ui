import React, { forwardRef } from 'react';
import useButtonStyle from './styles';
import PseudoBox from '../PseudoBox';

const Button = forwardRef(
  (
    {
      disabled,
      children,
      as: Comp = 'button',
      variant = 'solid',
      variantColor = 'default',
      type = 'button',
      size = 'md',
      colorMode,
      ...rest
    },
    ref,
  ) => {
    const buttonStyleProps = useButtonStyle({
      color: variantColor,
      size,
      colorMode,
    });

    return (
      <PseudoBox
        disabled={disabled}
        aria-disabled={disabled}
        ref={ref}
        as={Comp}
        type={type}
        borderRadius={variant === 'solid' ? 'md' : 'lg'}
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
