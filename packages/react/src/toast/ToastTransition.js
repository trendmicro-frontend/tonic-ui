import React, {
  forwardRef,
  useEffect,
  useRef,
} from 'react';
import { Transition } from 'react-transition-group';
import { Box } from '../box';
import {
  createTransitionStyle,
  getEnterTransitionProps,
  getExitTransitionProps,
  transitionDuration,
  transitionEasing,
} from '../utils/transitions';
import reflow from '../utils/reflow';
import useForkRef from '../utils/useForkRef';

const getScale = value => {
  return `scale(${value}, ${value ** 2})`;
};

const mapStateToVariantStyle = (state, props) => {
  const variantStyle = {
    entering: {
      height: 'auto',
      opacity: 1,
      transform: getScale(1),
    },
    entered: {
      height: 'auto',
      opacity: 1,
      transform: 'none',
    },
    exiting: {
      height: props.collapsedHeight || 0,
      overflow: 'hidden',
      opacity: 0,
      transform: getScale(0.75),
    },
    exited: {
      height: props.collapsedHeight || 0,
      opacity: 0,
      transform: getScale(0.75),
    },
  }[state];

  return (typeof variantStyle === 'function') ? variantStyle(props) : variantStyle;
};

const defaultEasing = {
  enter: transitionEasing.easeInOut,
  exit: transitionEasing.easeInOut,
};

const defaultTimeout = {
  enter: transitionDuration.standard,
  exit: transitionDuration.standard,
};

const Wrapper = forwardRef((props, ref) => <Box ref={ref} {...props} />);

const ToastTransition = forwardRef((
  {
    appear = true,
    children,
    collapsedHeight = 0,
    easing = defaultEasing,
    in: inProp,
    style,
    timeout = defaultTimeout,
    ...rest
  },
  ref,
) => {
  const nodeRef = useRef(null);
  const combinedRef = useForkRef(nodeRef, ref);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const node = nodeRef.current;
    reflow(node); // force reflow to make the transition work when animating appearance
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
        const transition = [
          createTransitionStyle('height', transitionProps),
          createTransitionStyle('opacity', transitionProps),
          createTransitionStyle('transform', {
            duration: transitionProps.duration * 0.666,
            easing: transitionProps.easing,
            delay: inProp
              ? transitionProps.delay
              : transitionProps.delay || (transitionProps.duration * 0.333),
          }),
        ].join(',');

        const variantStyle = mapStateToVariantStyle(state, { collapsedHeight });
        const styleProps = {
          ...variantStyle,
          transition,
          visibility: (state === 'exited' && !inProp && !collapsedHeight) ? 'hidden' : undefined,
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

        const isAnimationStart = (inProp && (state === 'entering')) ||
          (!inProp && (state === 'entering' || state === 'entered'));
        //const isAnimationEnd = (inProp && (state === 'entered')) ||
        //  (!inProp && (state === 'exited'));

        if (isAnimationStart) {
          const wrapper = wrapperRef.current;
          const contentHeight = wrapper?.offsetHeight;
          styleProps.height = contentHeight;
        }

        return (
          <Box
            ref={combinedRef}
            {...childProps}
            {...styleProps}
            style={style}
          >
            <Wrapper ref={wrapperRef}>
              {children}
            </Wrapper>
          </Box>
        );
      }}
    </Transition>
  );
});

ToastTransition.displayName = 'ToastTransition';

export default ToastTransition;
