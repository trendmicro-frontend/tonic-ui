import React, { forwardRef } from 'react';
import ButtonBase from '../ButtonBase';
import {
  defaultVariant,
} from './defaults';
import {
  useAlertCloseButtonStyle,
} from './styles';

const AlertCloseButton = forwardRef((
  {
    variant = defaultVariant,
    ...rest
  },
  ref,
) => {
  const styleProps = useAlertCloseButtonStyle({ variant });

  return (
    <ButtonBase
      ref={ref}
      {...styleProps}
      {...rest}
    />
  );
});

AlertCloseButton.displayName = 'AlertCloseButton';

export default AlertCloseButton;
