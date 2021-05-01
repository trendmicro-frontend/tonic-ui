import React, {
  forwardRef,
  useLayoutEffect,
  useRef,
} from 'react';
import { Transition } from 'react-transition-group';
import {
  transitionDuration,
  getEnterTransitionProps,
  getExitTransitionProps,
  createTransitionStyle,
} from './transitions';
import useForkRef from '../utils/useForkRef';
import Box from '../Box';
import { reflow } from './utils';

const transitionStateStyle = {
  entering: {
    transform: 'none',
  },
  entered: {
    transform: 'none',
  },
  exiting: {
    transform: 'scale(0)',
  },
  exited: {
    transform: 'scale(0)',
  },
};

const defaultTimeout = {
  enter: transitionDuration.enteringScreen,
  exit: transitionDuration.leavingScreen,
};

const Fade = forwardRef((
  {
    appear = true,
    children,
    easing,
    in: inProp,
    style,
    timeout = defaultTimeout,
    ...other
  },
  ref,
) => {
  const nodeRef = useRef(null);
  const combinedRef = useForkRef(nodeRef, ref);

  useLayoutEffect(() => {
    if (inProp) {
      const node = nodeRef.current;
      reflow(node); // force reflow to make the transition work when animating appearance
    }
  }, [inProp]);

  return (
    <Transition
      appear={appear}
      in={inProp}
      nodeRef={nodeRef}
      timeout={timeout}
      {...other}
    >
      {(state, childProps) => {
        const transitionProps = inProp
          ? getEnterTransitionProps({ style, timeout, easing })
          : getExitTransitionProps({ style, timeout, easing });
        const transition = createTransitionStyle('transform', transitionProps);
        const styleProps = {
          ...transitionStateStyle[state],
          transition,
          visibility: (state === 'exited' && !inProp) ? 'hidden' : undefined,
        };

        if (typeof children === 'function') {
          return children(state, {
            ref: combinedRef,
            ...childProps,
            style: {
              ...styleProps,
              ...style,
            },
          });
        }

        return (
          <Box
            ref={combinedRef}
            {...childProps}
            {...styleProps}
            style={style}
          >
            {children}
          </Box>
        );
      }}
    </Transition>
  );
});

Fade.displayName = 'Fade';

export default Fade;
