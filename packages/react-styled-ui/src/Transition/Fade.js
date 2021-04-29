import React, { forwardRef, useRef } from 'react';
import { Transition } from 'react-transition-group';
import {
  transitionDuration,
  getEnterTransitionProps,
  getExitTransitionProps,
  createTransitionStyle,
} from './transitions';
import useForkRef from '../utils/useForkRef';

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
  return (
    <Transition
      nodeRef={ref}
      appear={true}
      in={inProp}
      timeout={timeout}
      {...rest}
    >
      {(state, childProps) => {
        const transitionPropStyle = variantStyle[state];
        const transitionProps = inProp
          ? getEnterTransitionProps({ style, timeout, easing })
          : getExitTransitionProps({ style, timeout, easing });
        const transitionStyle = createTransitionStyle(['opacity'], transitionProps);

        childProps.style = {
          ...transitionPropStyle,
          transition: transitionStyle,
          visibility: (state === 'exited' && !inProp) ? 'hidden' : undefined,
          ...childProps.style,
        };

        if (typeof children === 'function') {
          return children(state, childProps);
        }

        return React.cloneElement(React.Children.only(children), {
          ...childProps,
        });
      }}
    </Transition>
  );
});

Fade.displayName = 'Fade';

export default Fade;
