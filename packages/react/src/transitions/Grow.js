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
