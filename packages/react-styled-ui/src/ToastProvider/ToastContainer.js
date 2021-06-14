import { ensureString } from 'ensure-type';
import React, { forwardRef } from 'react';
import Box from '../Box';

const ToastContainer = forwardRef(({
  placement,
  ...props
}, ref) => {
  const styleProps = {
    position: 'fixed',
    zIndex: 'toast',
  };

  placement = ensureString(placement);

  if (placement === 'top' || placement === 'bottom') {
    styleProps.margin = '0 auto';
    styleProps.textAlign = 'center';
  }
  if (placement.includes('top')) {
    styleProps.top = 0;
  }
  if (placement.includes('bottom')) {
    styleProps.bottom = 0;
  }
  if (!placement.includes('left')) {
    styleProps.right = 0;
  }
  if (!placement.includes('right')) {
    styleProps.left = 0;
  }

  return (
    <Box ref={ref} {...styleProps} {...props} />
  );
});

export default ToastContainer;
