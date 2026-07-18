import { useMergeRefs } from '@tonic-ui/react-hooks';
import { callEventHandlers } from '@tonic-ui/utils';
import React, { forwardRef, useCallback, useRef, useState } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import useTimeout from '../utils/useTimeout';

/**
 * @typedef {Object} ToastControllerProps
 * @property {React.ReactNode} [children] - A function child can be used intead of a React element. This function is invoked with an object that includes the `onClose` prop.
 * @property {number} [duration=null] - The duration in milliseconds after which the toast will be automatically closed. Set to `null` to disable auto-closing.
 * @property {() => void} [onClose] - A callback called when the toast is being closed.
 */

/**
 * @type {ForwardRefComponent<'div', ToastControllerProps>}
 */
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
