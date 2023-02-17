import React, { forwardRef } from 'react';
import { Box } from '../box';
import {
  useToastMessageStyle,
} from './styles';
import useToast from './useToast';

const ToastMessage = forwardRef((props, ref) => {
  const alertContext = useToast(); // context might be an undefined value
  const {
    isClosable,
  } = { ...alertContext };
  const styleProps = useToastMessageStyle({ isClosable });

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
