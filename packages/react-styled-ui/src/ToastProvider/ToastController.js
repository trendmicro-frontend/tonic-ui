import React, { forwardRef, useRef, useState } from 'react';
import Box from '../Box';
import useForkRef from '../utils/useForkRef';
import useTimeout from '../utils/useTimeout';

const ToastController = forwardRef(({
  children,
  duration = null,
  onClose,
  ...props
}, ref) => {
  const nodeRef = useRef();
  const combinedRef = useForkRef(ref, nodeRef);
  const [delay, setDelay] = useState(duration);
  const onMouseEnter = () => setDelay(null);
  const onMouseLeave = () => setDelay(duration);

  useTimeout(onClose, delay);

  return (
    <Box
      ref={combinedRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {children}
    </Box>
  );
});

export default ToastController;
