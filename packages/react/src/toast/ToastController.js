import { useMergeRefs } from '@tonic-ui/react-hooks';
import { callEventHandlers } from '@tonic-ui/utils';
import React, { forwardRef, useCallback, useRef, useState } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import useTimeout from '../utils/useTimeout';

const ToastController = forwardRef((inProps, ref) => {
  const {
    duration: durationProp = null,
    onClose: onCloseProp,
    onMouseEnter: onMouseEnterProp,
    onMouseLeave: onMouseLeaveProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'ToastController' });
  const nodeRef = useRef();
  const combinedRef = useMergeRefs(nodeRef, ref);
  const [delay, setDelay] = useState(durationProp);
  const onMouseEnter = useCallback((event) => {
    setDelay(null);
  }, []);
  const onMouseLeave = useCallback((event) => {
    setDelay(durationProp);
  }, [durationProp]);

  useTimeout(onCloseProp, delay);

  return (
    <Box
      ref={combinedRef}
      onMouseEnter={callEventHandlers(onMouseEnterProp, onMouseEnter)}
      onMouseLeave={callEventHandlers(onMouseLeaveProp, onMouseLeave)}
      {...rest}
    />
  );
});

export default ToastController;
