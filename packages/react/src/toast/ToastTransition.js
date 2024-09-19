import { useMergeRefs } from '@tonic-ui/react-hooks';
import { createTransitionStyle, getEnterTransitionProps, getExitTransitionProps, reflow, transitionDuration, transitionEasing } from '@tonic-ui/utils';
import React, { forwardRef, useEffect, useRef } from 'react';
import { Transition } from 'react-transition-group';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';

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
      height: 0,
      opacity: 0,
      overflow: 'hidden',
      transform: getScale(0.75),
    },
    exited: {
      height: 0,
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

const ToastTransition = forwardRef((inProps, ref) => {
  const {
    appear = false, // do not perform the enter transition when it first mounts
    children,
    easing = defaultEasing,
    in: inProp,
    style,
    timeout = defaultTimeout,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'ToastTransition' });
  const nodeRef = useRef(null);
  const combinedRef = useMergeRefs(nodeRef, ref);
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
