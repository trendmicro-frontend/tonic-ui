import React, { forwardRef } from 'react';
import Box from '../Box';

const ToastController = forwardRef((props, ref) => {
  return (
    <Box ref={ref} {...props} />
  );
});

export default ToastController;
