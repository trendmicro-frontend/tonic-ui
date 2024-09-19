import { useMergeRefs } from '@tonic-ui/react-hooks';
import { createTransitionStyle, getEnterTransitionProps, getExitTransitionProps, reflow, transitionDuration, transitionEasing } from '@tonic-ui/utils';
import React, { forwardRef, useEffect, useRef } from 'react';
import { Transition } from 'react-transition-group';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';

const mapStateToVariantStyle = (state, props) => {
  const variantStyle = {
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
  }[state];

  return (typeof variantStyle === 'function') ? variantStyle(props) : variantStyle;
};

const defaultEasing = {
  enter: transitionEasing.easeInOut,
  exit: transitionEasing.easeInOut,
};

const defaultTimeout = {
  enter: transitionDuration.enteringScreen,
  exit: transitionDuration.leavingScreen,
};

const Zoom = forwardRef((inProps, ref) => {
  const {
    appear = false, // do not perform the enter transition when it first mounts
    children,
    easing = defaultEasing,
    in: inProp,
    style,
    timeout = defaultTimeout,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Zoom' });
  const nodeRef = useRef(null);
  const combinedRef = useMergeRefs(nodeRef, ref);

  useEffect(() => {
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
      {...rest}
    >
      {(state, childProps) => {
        const transitionProps = inProp
          ? getEnterTransitionProps({ style, timeout, easing })
          : getExitTransitionProps({ style, timeout, easing });
        const transition = createTransitionStyle('transform', transitionProps);
        const variantStyle = mapStateToVariantStyle(state, {});
        const styleProps = {
          ...variantStyle,
          transition,
          visibility: (state === 'exited' && !inProp) ? 'hidden' : undefined,
        };

        if (typeof children === 'function') {
          return children(state, {
            ...childProps,
            ref: combinedRef,
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

Zoom.displayName = 'Zoom';

export default Zoom;
