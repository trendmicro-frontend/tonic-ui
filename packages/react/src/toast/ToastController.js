import { useMergeRefs } from '@tonic-ui/react-hooks';
import { callEventHandlers } from '@tonic-ui/utils';
import React, { forwardRef, useCallback, useRef, useState } from 'react';
import { Box } from '../box';
import useTimeout from '../utils/useTimeout';

const ToastController = forwardRef(({
  children,
  duration = null,
  onClose,
  onMouseEnter: onMouseEnterProp,
  onMouseLeave: onMouseLeaveProp,
  ...rest
}, ref) => {
  const nodeRef = useRef();
  const combinedRef = useMergeRefs(nodeRef, ref);
  const [delay, setDelay] = useState(duration);
  const onMouseEnter = useCallback((event) => {
    setDelay(null);
  }, []);
  const onMouseLeave = useCallback((event) => {
    setDelay(duration);
  }, [duration]);

  useTimeout(onClose, delay);

  return (
    <Box
      ref={combinedRef}
      onMouseEnter={callEventHandlers(onMouseEnterProp, onMouseEnter)}
      onMouseLeave={callEventHandlers(onMouseLeaveProp, onMouseLeave)}
      {...rest}
    >
      {children}
    </Box>
  );
});

export default ToastController;
