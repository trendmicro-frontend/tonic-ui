import { useMergeRefs } from '@tonic-ui/react-hooks';
import {
  AngleUpIcon,
  AngleDownIcon,
  AngleLeftIcon,
  AngleRightIcon,
} from '@tonic-ui/react-icons';
import { ariaAttr, createTransitionStyle, getEnterTransitionProps, getExitTransitionProps, reflow, transitionEasing } from '@tonic-ui/utils';
import React, { forwardRef, useEffect, useRef } from 'react';
import { Transition } from 'react-transition-group';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import {
  useMenuToggleIconStyle,
} from './styles';
import useMenu from './useMenu';

const mapStateToVariantStyle = (state, props) => {
  const variantStyle = {
    entering: (props) => ({
      transform: {
        up: 'rotate(180deg)',
        down: 'rotate(-180deg)',
      }[props.direction],
    }),
    entered: (props) => ({
      transform: {
        up: 'rotate(180deg)',
        down: 'rotate(-180deg)',
      }[props.direction],
    }),
    exiting: (props) => ({
      transform: {
        up: 'rotate(0deg)',
        down: 'rotate(0deg)',
      }[props.direction],
    }),
    exited: (props) => ({
      transform: {
        up: 'rotate(0deg)',
        down: 'rotate(0deg)',
      }[props.direction],
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
 * @typedef {Object} MenuToggleIconProps
 * @property {boolean} [appear=false] - By default the child component does not perform the enter transition when it first mounts, regardless of the value of `in`. If you want this behavior, set both `appear` and `in` to true.
 * @property {React.ReactNode | ((state: string, props: React.HTMLAttributes<HTMLDivElement> & { ref: React.RefCallback<HTMLElement>; style: React.CSSProperties }) => React.ReactNode)} [children] - A function child can be used instead of a React element. This function is called with the current transition state ('entering', 'entered', 'exiting', 'exited'), ref, style, and context specific props for a component.
 * @property {boolean} [disabled] - Whether the menu toggle icon is disabled.
 * @property {string | { enter?: string, exit?: string }} [easing] - The timing function that describes how intermediate values are calculated during a transition. You may specify a single timing function for all transitions, or individually with an object.
 * @property {boolean} [in] - If `true`, the component will transition in.
 * @property {boolean} [mountOnEnter] - If `true`, it will "lazy mount" the component on the first `in={true}`. After the first enter transition the component will stay mounted, even on the 'exited' state, unless you also specify `unmountOnExit`. By default the child component is mounted immediately along with the parent transition component.
 * @property {number | { appear?: number, enter?: number, exit?: number }} [timeout] - The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object.
 * @property {boolean} [unmountOnExit] - If `true`, it will unmount the child component when `in={false}` and the animation has finished. By default the child component stays mounted after it reaches the 'exited' state.
 */

/**
 * @type {ForwardRefComponent<'div', MenuToggleIconProps>}
 */
const MenuToggleIcon = forwardRef((inProps, ref) => {
  const {
    appear = false, // do not perform the enter transition when it first mounts
    children,
    disabled,
    easing = defaultEasing,
    style,
    timeout = defaultTimeout,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'MenuToggleIcon' });
  const menuContext = useMenu(); // context might be an undefined value
  const {
    isOpen,
    direction,
  } = { ...menuContext };
  const toggleIconStyleProps = useMenuToggleIconStyle();
  const nodeRef = useRef(null);
  const combinedRef = useMergeRefs(nodeRef, ref);

  useEffect(() => {
    if (isOpen) {
      const node = nodeRef.current;
      reflow(node); // force reflow to make the transition work when animating appearance
    }
  }, [isOpen]);

  return (
    <Transition
      appear={appear}
      in={isOpen}
      nodeRef={nodeRef}
      timeout={timeout}
      {...rest}
    >
      {(state, childProps) => {
        const transitionProps = isOpen
          ? getEnterTransitionProps({ style, timeout, easing })
          : getExitTransitionProps({ style, timeout, easing });
        const transition = createTransitionStyle('transform', transitionProps);
        const variantStyle = mapStateToVariantStyle(state, { direction });
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

        const IconComponent = {
          up: AngleUpIcon,
          down: AngleDownIcon,
          left: AngleLeftIcon,
          right: AngleRightIcon,
        }[direction];

        return (
          <Box
            ref={combinedRef}
            {...styleProps}
            {...childProps}
            style={style}
          >
            {children ?? (!!IconComponent && <IconComponent size="4x" />)}
          </Box>
        );
      }}
    </Transition>
  );
});

MenuToggleIcon.displayName = 'MenuToggleIcon';

export default MenuToggleIcon;
