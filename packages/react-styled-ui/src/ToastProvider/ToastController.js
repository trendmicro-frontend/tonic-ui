import React, { forwardRef, useEffect, useState } from 'react';
import Box from '../Box';
import useTimeout from '../utils/useTimeout';

const ToastController = forwardRef(({
  placement,
  onRequestRemove,
  requestClose,
  duration = 30000,
  ...props
}, ref) => {
  const [delay, setDelay] = useState(duration);
  const [localShow, setLocalShow] = useState(true);
  //const isFromTop = placement.startsWith('top');

  const onMouseEnter = () => setDelay(null);
  const onMouseLeave = () => setDelay(duration);
  const close = function() {
    setLocalShow(false);
  };

  useEffect(() => {
    if (requestClose) {
      setLocalShow(false);
    }
  }, [requestClose]);

  // FIXME: animation end
  useEffect(() => {
    if (!localShow) {
      onRequestRemove();
    }
  }, [localShow, onRequestRemove]);

  useTimeout(close, delay);

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
