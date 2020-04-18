import React, { forwardRef } from 'react';
import Box from '../Box';
import {
  useToastStyle,
} from './styles';

const Toast = forwardRef((
  {
    children,
    ...rest
  },
  ref,
) => {
  const styleProps = useToastStyle();

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...rest}
    >
      {children}
    </Box>
  );
});

Toast.displayName = 'Toast';

export default Toast;
