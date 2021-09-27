import React, { forwardRef, useEffect, useRef, useState } from 'react';
import Box from '../Box';
import useForkRef from '../utils/useForkRef';
import useTimeout from '../utils/useTimeout';
import reflow from '../utils/reflow';

const ToastController = forwardRef(({
  children,
  duration = null,
  onClose,
  transitionState,
  ...props
}, ref) => {
  const nodeRef = useRef();
  const combinedRef = useForkRef(ref, nodeRef);
  const [delay, setDelay] = useState(duration);
  const onMouseEnter = () => setDelay(null);
  const onMouseLeave = () => setDelay(duration);

  useEffect(() => {
    const node = nodeRef.current;
    reflow(node);
  }, [transitionState]);

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
