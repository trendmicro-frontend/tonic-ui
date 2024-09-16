import { useMergeRefs } from '@tonic-ui/react-hooks';
import { createTransitionStyle, getEnterTransitionProps, getExitTransitionProps, reflow, transitionDuration, transitionEasing } from '@tonic-ui/utils';
import React, { forwardRef, useEffect, useRef } from 'react';
import { Transition } from 'react-transition-group';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';

const mapStateToVariantStyle = (state, props) => {
  const variantStyle = {
    entering: {
      height: 'auto',
      opacity: 1,
      overflow: 'hidden',
    },
    entered: {
      height: 'auto',
      opacity: 1,
    },
    exiting: {
      height: props.collapsedHeight || 0,
      opacity: 0,
      overflow: 'hidden',
    },
    exited: {
      height: props.collapsedHeight || 0,
      opacity: 0,
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

const Collapse = forwardRef((inProps, ref) => {
  const {
    appear = false, // do not perform the enter transition when it first mounts
    children,
    collapsedHeight = 0,
    easing = defaultEasing,
    in: inProp,
    style,
    timeout = defaultTimeout,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Collapse' });
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
        const transition = createTransitionStyle(['height', 'opacity'], transitionProps);
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

Collapse.displayName = 'Collapse';

export default Collapse;
