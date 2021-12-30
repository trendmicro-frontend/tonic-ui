import React, { forwardRef, useRef, useState } from 'react';
import { Box } from '../box';
import useForkRef from '../utils/useForkRef';
import useTimeout from '../utils/useTimeout';

const ToastController = forwardRef(({
  children,
  duration = null,
  onClose,
  ...rest
}, ref) => {
  const nodeRef = useRef();
  const combinedRef = useForkRef(nodeRef, ref);
  const [delay, setDelay] = useState(duration);
  const onMouseEnter = () => setDelay(null);
  const onMouseLeave = () => setDelay(duration);

  useTimeout(onClose, delay);

  return (
    <Box
      ref={combinedRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...rest}
    >
      {children}
    </Box>
  );
});

export default ToastController;
