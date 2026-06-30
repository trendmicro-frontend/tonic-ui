import { useMergeRefs } from '@tonic-ui/react-hooks';
import { createTransitionStyle, getEnterTransitionProps, getExitTransitionProps, reflow, transitionEasing } from '@tonic-ui/utils';
import { ensureFiniteNumber } from 'ensure-type';
import React, { forwardRef, useCallback, useEffect, useRef } from 'react';
import { Transition } from 'react-transition-group';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';

const getScale = value => {
  return `scale(${value}, ${value ** 2})`;
};

const mapStateToVariantStyle = (state, props) => {
  const variantStyle = {
    entering: {
      opacity: 1,
      transform: getScale(1),
    },
    entered: {
      opacity: 1,
      transform: 'none',
    },
    exiting: {
      opacity: 0,
      transform: getScale(0.75),
    },
    exited: {
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

const getAutoHeightDuration = height => {
  height = ensureFiniteNumber(height);
  if (!height) {
    return 0;
  }
  const value = height / 36;
  // https://www.wolframalpha.com/input/?i=(4+%2B+15+*+(x+%2F+36+)+**+0.25+%2B+(x+%2F+36)+%2F+5)+*+10
  return Math.round((4 + 15 * (value ** 0.25) + value / 5) * 10);
};

/**
 * @typedef {Object} GrowProps
 * @property {boolean} [appear=false] - By default the child component does not perform the enter transition when it first mounts, regardless of the value of `in`. If you want this behavior, set both `appear` and `in` to true.
 * @property {React.ReactNode | ((state: string, props: React.HTMLAttributes<HTMLDivElement> & { ref: React.RefCallback<HTMLElement>; style: React.CSSProperties }) => React.ReactNode)} [children] - A function child can be used instead of a React element. This function is called with the current transition state ('entering', 'entered', 'exiting', 'exited'), ref, style, and context specific props for a component.
 * @property {string | { enter?: string; exit?: string }} [easing] - The timing function that describes how intermediate values are calculated during a transition. You may specify a single timing function for all transitions, or individually with an object.
 * @property {boolean} [in] - If `true`, the component will transition in.
 * @property {boolean} [mountOnEnter] - If `true`, it will "lazy mount" the component on the first `in={true}`. After the first enter transition the component will stay mounted, even on the 'exited' state, unless you also specify `unmountOnExit`.
 * @property {number | 'auto' | { appear?: number; enter?: number; exit?: number }} [timeout='auto'] - The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object. Set to 'auto' for automatic duration calculation.
 * @property {boolean} [unmountOnExit] - If `true`, it will unmount the child component when `in={false}` and the animation has finished.
 */

/**
 * @type {ForwardRefComponent<'div', GrowProps>}
 */
const Grow = forwardRef((inProps, ref) => {
  const {
    appear = false, // do not perform the enter transition when it first mounts
    children,
    easing = defaultEasing,
    in: inProp,
    style,
    timeout = 'auto',
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Grow' });
  const timer = useRef(null);
  const autoTimeout = useRef(0);
  const nodeRef = useRef(null);
  const combinedRef = useMergeRefs(nodeRef, ref);

  useEffect(() => {
    if (inProp) {
      const node = nodeRef.current;
      reflow(node); // force reflow to make the transition work when animating appearance
    }
  }, [inProp]);

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }
    };
  }, []);

  const addEndListener = useCallback((next) => {
    if (timeout === 'auto') {
      timer.current = setTimeout(next, autoTimeout.current || 0);
    }
  }, [timeout]);

  return (
    <Transition
      appear={appear}
      in={inProp}
      nodeRef={nodeRef}
      timeout={timeout === 'auto' ? null : timeout}
      addEndListener={addEndListener}
      {...rest}
    >
      {(state, childProps) => {
        const node = nodeRef.current;
        const transitionProps = inProp
          ? getEnterTransitionProps({ style, timeout, easing })
          : getExitTransitionProps({ style, timeout, easing });
        const duration = (timeout === 'auto')
          ? getAutoHeightDuration(node?.clientHeight)
          : transitionProps.duration;
        const transition = [
          createTransitionStyle('opacity', {
            duration,
            delay: transitionProps.delay,
          }),
          createTransitionStyle('transform', {
            duration: duration * 0.666,
            easing: transitionProps.easing,
            delay: inProp
              ? transitionProps.delay
              : transitionProps.delay || (duration * 0.333),
          }),
        ].join(',');

        autoTimeout.current = (timeout === 'auto') ? duration : 0;

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

Grow.displayName = 'Grow';

export default Grow;
