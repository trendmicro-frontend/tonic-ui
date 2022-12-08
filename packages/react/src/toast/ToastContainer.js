import { ensureString } from 'ensure-type';
import React, { forwardRef } from 'react';
import { Box } from '../box';

const ToastContainer = forwardRef(({
  placement,
  ...rest
}, ref) => {
  const styleProps = {
    boxSizing: 'border-box',
    maxHeight: '100%',
    maxWidth: '100%',
    overflow: 'hidden',
    position: 'fixed',
    zIndex: 'toast',
  };

  placement = ensureString(placement);

  if (placement.includes('top')) {
    styleProps.top = 0;
  }
  if (placement.includes('bottom')) {
    styleProps.bottom = 0;
  }
  if (placement.includes('left')) {
    styleProps.left = 0;
  }
  if (placement.includes('right')) {
    styleProps.right = 0;
  }
  if (placement.includes('center') || placement === 'top' || placement === 'bottom') {
    styleProps.left = '50%';
    styleProps.transform = 'translateX(-50%)';
  }

  return (
    <Box
      ref={ref}
      data-toast-placement={placement}
      {...styleProps}
      {...rest}
    />
  );
});

export default ToastContainer;
