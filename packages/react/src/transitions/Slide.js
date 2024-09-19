import { useMergeRefs } from '@tonic-ui/react-hooks';
import { createTransitionStyle, getEnterTransitionProps, getExitTransitionProps, reflow, transitionDuration, transitionEasing } from '@tonic-ui/utils';
import React, { forwardRef, useEffect, useRef } from 'react';
import { Transition } from 'react-transition-group';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';

const DIRECTION_LEFT = 'left';
const DIRECTION_RIGHT = 'right';
const DIRECTION_UP = 'up';
const DIRECTION_DOWN = 'down';

const mapStateToVariantStyle = (state, props) => {
  const variantStyle = {
    entering: {
      transform: 'none',
    },
    entered: {
      transform: 'none',
    },
    exiting: (props) => ({
      [DIRECTION_LEFT]: {
        transform: 'translateX(100%)',
      },
      [DIRECTION_RIGHT]: {
        transform: 'translateX(-100%)',
      },
      [DIRECTION_UP]: {
        transform: 'translateY(100%)',
      },
      [DIRECTION_DOWN]: {
        transform: 'translateY(-100%)',
      },
    }[props.direction]),
    exited: (props) => ({
      [DIRECTION_LEFT]: {
        transform: 'translateX(100%)',
      },
      [DIRECTION_RIGHT]: {
        transform: 'translateX(-100%)',
      },
      [DIRECTION_UP]: {
        transform: 'translateY(100%)',
      },
      [DIRECTION_DOWN]: {
        transform: 'translateY(-100%)',
      },
    }[props.direction]),
  }[state];

  return (typeof variantStyle === 'function') ? variantStyle(props) : variantStyle;
};

const defaultEasing = {
  enter: transitionEasing.easeOut,
  exit: transitionEasing.sharp,
};

const defaultTimeout = {
  enter: transitionDuration.enteringScreen,
  exit: transitionDuration.leavingScreen,
};

const Slide = forwardRef((inProps, ref) => {
  const {
    appear = false, // do not perform the enter transition when it first mounts
    children,
    direction = DIRECTION_DOWN,
    easing = defaultEasing,
    in: inProp,
    style,
    timeout = defaultTimeout,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Slide' });
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
        const variantStyle = mapStateToVariantStyle(state, { direction });
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

Slide.displayName = 'Slide';

export default Slide;
