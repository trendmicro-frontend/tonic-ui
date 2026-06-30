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

/**
 * @typedef {Object} CollapseProps
 * @property {boolean} [appear=false] - By default the child component does not perform the enter transition when it first mounts, regardless of the value of `in`. If you want this behavior, set both `appear` and `in` to true.
 * @property {React.ReactNode | ((state: string, props: React.HTMLAttributes<HTMLDivElement> & { ref: React.RefCallback<HTMLElement>; style: React.CSSProperties }) => React.ReactNode)} [children] - A function child can be used instead of a React element. This function is called with the current transition state ('entering', 'entered', 'exiting', 'exited'), ref, style, and context specific props for a component.
 * @property {number} [collapsedHeight=0] - The height of the component when collapsed.
 * @property {string | { enter?: string; exit?: string }} [easing] - The timing function that describes how intermediate values are calculated during a transition. You may specify a single timing function for all transitions, or individually with an object.
 * @property {boolean} [in] - If `true`, the component will transition in.
 * @property {boolean} [mountOnEnter] - If `true`, it will "lazy mount" the component on the first `in={true}`. After the first enter transition the component will stay mounted, even on the 'exited' state, unless you also specify `unmountOnExit`.
 * @property {number | { appear?: number; enter?: number; exit?: number }} [timeout] - The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object.
 * @property {boolean} [unmountOnExit] - If `true`, it will unmount the child component when `in={false}` and the animation has finished.
 */

/**
 * @type {ForwardRefComponent<'div', CollapseProps>}
 */
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
