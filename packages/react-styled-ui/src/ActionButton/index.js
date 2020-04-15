import React, { forwardRef } from 'react';
import FlatButton from '../FlatButton';

const ActionButton = forwardRef((
  {
    disabled,
    children,
    as = 'button',
    type = 'button',
    ...rest
  },
  ref,
) => {
  return (
    <FlatButton
      disabled={disabled}
      aria-disabled={disabled}
      ref={ref}
      as={as}
      type={type}
      variant="outline"
      variantColor="black:emphasis"
      size="sm"
      minWidth={76}
    >
      {children}
    </FlatButton>
  );
});

export default ActionButton;
