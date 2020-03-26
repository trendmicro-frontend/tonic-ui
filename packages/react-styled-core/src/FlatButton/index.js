import React, { forwardRef } from 'react';
import useButtonStyle from './styles';
import ButtonBase from '../ButtonBase';

const FlatButton = forwardRef(
  (
    {
      as: Comp = 'button',
      borderRadius = 'sm',
      children,
      px = '3x',
      size = 'md',
      type = 'button',
      variant = 'solid',
      variantColor,
      ...rest
    },
    ref,
  ) => {
    const buttonStyleProps = useButtonStyle({
      color: variantColor,
      size,
      variant,
    });

    return (
      <ButtonBase
        ref={ref}
        as={Comp}
        type={type}
        borderRadius={borderRadius}
        px={px}
        {...buttonStyleProps}
        {...rest}
      >
        { children }
      </ButtonBase>
    );
  },
);

FlatButton.displayName = 'FlatButton';

export default FlatButton;
