import React, {
  forwardRef,
  useLayoutEffect,
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

/*
const isPercentage = n => {
  return (typeof n === 'string') && /^(\d+(\.\d+)?|\.\d+)%$/i.test(n);
};
*/

const mapStateToVariantStyle = (state, props) => {
  const variantStyle = {
    entering: {
      height: 'auto',
    },
    entered: {
      height: 'auto',
    },
    exiting: {
      height: 0,
      overflow: 'hidden',
    },
    exited: {
      height: 0,
      overflow: 'hidden',
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

const Wrapper = forwardRef((props, ref) => <Box ref={ref} {...props} />);

/**
 * The Collapse transition can be used for the floating action buttons.
 */
const Collapse = forwardRef((
  {
    appear = true,
    children,
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

  useLayoutEffect(() => {
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
      {...other}
    >
      {(state, childProps) => {
        const transitionProps = inProp
          ? getEnterTransitionProps({ style, timeout, easing })
          : getExitTransitionProps({ style, timeout, easing });
        const transition = createTransitionStyle('height', transitionProps);
        const variantStyle = mapStateToVariantStyle(state, {});
        const styleProps = {
          ...variantStyle,
          transition,
          visibility: (state === 'exited' && !inProp) ? 'hidden' : undefined,
        };

        if (typeof children === 'function') {
          return children(state, {
            ref: combinedRef,
            ...childProps,
            style: {
              ...styleProps,
              ...style,
            },
          });
        }

        if ((state === 'entering' && inProp) || (state === 'entered' && !inProp)) {
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
