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

/**
 * @typedef {Object} ToastTransitionProps
 * @property {boolean} [appear=false] - By default the child component does not perform the enter transition when it first mounts, regardless of the value of `in`. If you want this behavior, set both `appear` and `in` to true.
 * @property {React.ReactNode | ((state: string, props: Object) => React.ReactNode)} [children] - A function child can be used instead of a React element. This function is called with the current transition state ('entering', 'entered', 'exiting', 'exited'), ref, style, and context specific props for a component.
 * @property {string | { enter?: string, exit?: string }} [easing] - The timing function that describes how intermediate values are calculated during a transition. You may specify a single timing function for all transitions, or individually with an object.
 * @property {boolean} [in] - If `true`, the component will transition in.
 * @property {boolean} [mountOnEnter] - If `true`, it will "lazy mount" the component on the first `in={true}`. After the first enter transition the component will stay mounted, even on the 'exited' state, unless you also specify `unmountOnExit`. By default the child component is mounted immediately along with the parent transition component.
 * @property {number | { appear?: number, enter?: number, exit?: number }} [timeout] - The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object.
 * @property {boolean} [unmountOnExit] - If `true`, it will unmount the child component when `in={false}` and the animation has finished. By default the child component stays mounted after it reaches the 'exited' state.
 */

/**
 * @type {ForwardRefComponent<'div', ToastTransitionProps>}
 */
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
