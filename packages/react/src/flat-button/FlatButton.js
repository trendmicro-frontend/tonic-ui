import React, { forwardRef } from 'react';
import { ButtonBase } from '../button';
import { useFlatButtonStyle } from './styles';

const FlatButton = forwardRef((
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
  const styleProps = useFlatButtonStyle({
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
      {...styleProps}
      {...rest}
    >
      { children }
    </ButtonBase>
  );
});

FlatButton.displayName = 'FlatButton';

export default FlatButton;
