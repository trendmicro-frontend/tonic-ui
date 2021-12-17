import React, { forwardRef } from 'react';
import Box from '../Box';
import {
  useToastMessageStyle,
} from './styles';

const ToastMessage = forwardRef((props, ref) => {
  const styleProps = useToastMessageStyle({});

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

ToastMessage.displayName = 'ToastMessage';

export default ToastMessage;
