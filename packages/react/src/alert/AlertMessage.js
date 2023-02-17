import React, { forwardRef } from 'react';
import { Box } from '../box';
import {
  useAlertMessageStyle,
} from './styles';
import useAlert from './useAlert';

const AlertMessage = forwardRef((props, ref) => {
  const alertContext = useAlert(); // context might be an undefined value
  const {
    isClosable,
  } = { ...alertContext };
  const styleProps = useAlertMessageStyle({ isClosable });

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

AlertMessage.displayName = 'AlertMessage';

export default AlertMessage;
