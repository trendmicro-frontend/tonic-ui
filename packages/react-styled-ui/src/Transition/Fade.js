import React, { forwardRef, useRef } from 'react';
import { Transition } from 'react-transition-group';
import {
  transitionDuration,
  getEnterTransitionProps,
  getExitTransitionProps,
  createTransitionStyle,
} from './transitions';
import useForkRef from '../utils/useForkRef';
import Box from '../Box';

const variantStyle = {
  entering: {
    opacity: 0,
  },
  entered: {
    opacity: 1,
  },
  exiting: {
    opacity: 0,
  },
  exited: {
    opacity: 0,
  },
};

const defaultTimeout = {
  enter: transitionDuration.enteringScreen,
  exit: transitionDuration.leavingScreen,
};

const Fade = forwardRef((
  {
    in: inProp,
    children,
    style,
    timeout = defaultTimeout,
    easing,
    ...rest
  },
  ref,
) => {
  const nodeRef = useRef(null);
  const combinedRef = useForkRef(ref, nodeRef);

  return (
    <Transition
      nodeRef={nodeRef}
      appear={true}
      in={inProp}
      timeout={timeout}
      {...rest}
    >
      {(state, childProps) => {
        const transitionProps = inProp
          ? getEnterTransitionProps({ style, timeout, easing })
          : getExitTransitionProps({ style, timeout, easing });
        const transitionStyle = createTransitionStyle(['opacity'], transitionProps);

        childProps.style = {
          opacity: 0,
          visibility: (state === 'exited' && !inProp) ? 'hidden' : undefined,
          ...variantStyle[state],
          transition: transitionStyle,
          ...style,
          ...childProps.style,
        };

        if (typeof children === 'function') {
          return children(state, { ref: combinedRef, ...childProps });
        }

        return (
          <Box ref={combinedRef} {...childProps}>
            {children}
          </Box>
        );
      }}
    </Transition>
  );
});

Fade.displayName = 'Fade';

export default Fade;
