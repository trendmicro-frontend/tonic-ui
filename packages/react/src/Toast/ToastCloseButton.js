import React, { forwardRef } from 'react';
import ButtonBase from '../ButtonBase';
import {
  useToastCloseButtonStyle,
} from './styles';

const ToastCloseButton = forwardRef((props, ref) => {
  const styleProps = useToastCloseButtonStyle({});

  return (
    <ButtonBase
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

ToastCloseButton.displayName = 'ToastCloseButton';

export default ToastCloseButton;
