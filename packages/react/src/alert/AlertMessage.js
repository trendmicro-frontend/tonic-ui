import React, { forwardRef } from 'react';
import { Box } from '../box';
import {
  useAlertMessageStyle,
} from './styles';

const AlertMessage = forwardRef((props, ref) => {
  const styleProps = useAlertMessageStyle({});

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
