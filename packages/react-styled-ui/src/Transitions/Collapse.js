import { ensureFiniteNumber } from 'ensure-type';
import React, {
  forwardRef,
  useEffect,
  useRef,
} from 'react';
import { Transition } from 'react-transition-group';
import {
  createTransitionStyle,
  getEnterTransitionProps,
  getExitTransitionProps,
  transitionDuration,
  transitionEasing,
} from './transitions';
import reflow from '../utils/reflow';
import useForkRef from '../utils/useForkRef';
import Box from '../Box';
import PseudoBox from '../PseudoBox';

const mapStateToVariantStyle = (state, props) => {
  const variantStyle = {
    entering: {
      height: 'auto',
    },
    entered: {
      height: 'auto',
    },
    exiting: {
      height: props.collapsedHeight || 0,
      overflow: 'hidden',
    },
    exited: {
      height: props.collapsedHeight || 0,
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
 * The Collapse transition can be used for the floating action buttons.
 */
const Collapse = forwardRef((
  {
    appear = true,
    children,
    collapsedHeight = 0,
    easing = defaultEasing,
    in: inProp,
    style,
    timeout = defaultTimeout,
    ...other
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
      {...other}
    >
      {(state, childProps) => {
        const transitionProps = inProp
          ? getEnterTransitionProps({ style, timeout, easing })
          : getExitTransitionProps({ style, timeout, easing });
        const transition = createTransitionStyle('height', transitionProps);
        const variantStyle = mapStateToVariantStyle(state, { collapsedHeight });
        const styleProps = {
          ...variantStyle,
          transition,
          visibility: (state === 'exited' && !inProp && !collapsedHeight) ? 'hidden' : undefined,
        };
        const isAnimationStart = (inProp && (state === 'entering'))
          || (!inProp && (state === 'entering' || state === 'entered'));
        const isAnimationEnd = (inProp && (state === 'entered'))
          || (!inProp && (state === 'exited'));

        if (typeof children === 'function') {
          return children(state, {
            ...childProps,
            ref: combinedRef,
            isAnimationStart,
            isAnimationEnd,
            style: {
              ...styleProps,
              ...style,
            },
          });
        }

        if (isAnimationStart) {
          const wrapper = wrapperRef.current;
          const contentHeight = wrapper?.offsetHeight;
          styleProps.height = contentHeight;
        }

        return (
          <PseudoBox
            ref={combinedRef}
            {...childProps}
            {...styleProps}
            style={style}
          >
            <Wrapper ref={wrapperRef}>
              {children}
            </Wrapper>
          </PseudoBox>
        );
      }}
    </Transition>
  );
});

Collapse.displayName = 'Collapse';

export default Collapse;
