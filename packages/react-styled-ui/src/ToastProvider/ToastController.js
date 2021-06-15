import React, { forwardRef, useState } from 'react';
import Box from '../Box';
import useTimeout from '../utils/useTimeout';

const ToastController = forwardRef(({
  duration = null,
  onClose,
  ...props
}, ref) => {
  const [delay, setDelay] = useState(duration);
  const onMouseEnter = () => setDelay(null);
  const onMouseLeave = () => setDelay(duration);
  useTimeout(onClose, delay);

  return (
    <Box
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...props}
    />
  );
});

export default ToastController;
