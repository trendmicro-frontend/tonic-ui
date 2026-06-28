import { useMergeRefs } from '@tonic-ui/react-hooks';
import { ChevronDownIcon } from '@tonic-ui/react-icons';
import { ariaAttr, createTransitionStyle, getEnterTransitionProps, getExitTransitionProps, reflow, transitionEasing } from '@tonic-ui/utils';
import { ensureBoolean } from 'ensure-type';
import React, { forwardRef, useEffect, useRef } from 'react';
import { Transition } from 'react-transition-group';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import {
  useAccordionToggleIconStyle,
} from './styles';
import useAccordionItem from './useAccordionItem';

const mapStateToVariantStyle = (state, props) => {
  const variantStyle = {
    entering: (props) => ({
      transform: 'rotate(-180deg)',
    }),
    entered: (props) => ({
      transform: 'rotate(-180deg)',
    }),
    exiting: (props) => ({
      transform: 'rotate(0deg)',
    }),
    exited: (props) => ({
      transform: 'rotate(0deg)',
    }),
  }[state];

  return (typeof variantStyle === 'function') ? variantStyle(props) : variantStyle;
};

const defaultEasing = {
  enter: transitionEasing.easeOut,
  exit: transitionEasing.easeOut,
};

const defaultTimeout = {
  enter: 133,
  exit: Math.floor(133 * 0.7),
};

/**
 * @typedef {Object} AccordionToggleIconProps
 * @property {React.ReactNode | ((state: string, props: React.HTMLAttributes<HTMLDivElement> & { ref: React.RefCallback<HTMLElement>; style: React.CSSProperties }) => React.ReactNode)} [children] - A function child can be used instead of a React element. This function is called with the current transition state ('entering', 'entered', 'exiting', 'exited'), ref, style, and context specific props for a component.
 * @property {boolean} [appear=false] - By default the child component does not perform the enter transition when it first mounts, regardless of the value of `in`. If you want this behavior, set both `appear` and `in` to true.
 * @property {boolean} [disabled] - Whether the accordion toggle icon is disabled.
 * @property {string | { enter?: string, exit?: string }} [easing] - The timing function that describes how intermediate values are calculated during a transition. You may specify a single timing function for all transitions, or individually with an object.
 * @property {boolean} [in] - If `true`, the component will transition in.
 * @property {boolean} [mountOnEnter] - If `true`, it will "lazy mount" the component on the first `in={true}`.
 * @property {number | { appear?: number, enter?: number, exit?: number }} [timeout] - The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object.
 * @property {boolean} [unmountOnExit] - If `true`, it will unmount the child component when `in={false}` and the animation has finished.
 */

/**
 * @type {ForwardRefComponent<'div', AccordionToggleIconProps>}
 */
const AccordionToggleIcon = forwardRef((inProps, ref) => {
  const {
    appear = false, // do not perform the enter transition when it first mounts
    children,
    disabled: disabledProp,
    easing = defaultEasing,
    style,
    timeout = defaultTimeout,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'AccordionToggleIcon' });
  const context = useAccordionItem(); // context might be an undefined value
  const toggleIconStyleProps = useAccordionToggleIconStyle();
  const nodeRef = useRef(null);
  const combinedRef = useMergeRefs(nodeRef, ref);
  const disabled = ensureBoolean(disabledProp ?? context?.disabled);
  const isExpanded = ensureBoolean(context?.isExpanded);

  useEffect(() => {
    if (isExpanded) {
      const node = nodeRef.current;
      reflow(node); // force reflow to make the transition work when animating appearance
    }
  }, [isExpanded]);

  return (
    <Transition
      appear={appear}
      in={isExpanded}
      nodeRef={nodeRef}
      timeout={timeout}
      {...rest}
    >
      {(state, childProps) => {
        const transitionProps = isExpanded
          ? getEnterTransitionProps({ style, timeout, easing })
          : getExitTransitionProps({ style, timeout, easing });
        const transition = createTransitionStyle('transform', transitionProps);
        const variantStyle = mapStateToVariantStyle(state, {});
        const styleProps = {
          ...toggleIconStyleProps,
          ...variantStyle,
          'aria-disabled': ariaAttr(disabled),
          transition,
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
            {...styleProps}
            {...childProps}
            style={style}
          >
            {children ?? <ChevronDownIcon size="4x" />}
          </Box>
        );
      }}
    </Transition>
  );
});

AccordionToggleIcon.displayName = 'AccordionToggleIcon';

export default AccordionToggleIcon;
