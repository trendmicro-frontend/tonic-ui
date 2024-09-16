import { useMergeRefs } from '@tonic-ui/react-hooks';
import {
  AngleUpIcon,
  AngleDownIcon,
  AngleLeftIcon,
  AngleRightIcon,
} from '@tonic-ui/react-icons';
import { ariaAttr, createTransitionStyle, getEnterTransitionProps, getExitTransitionProps, reflow, transitionEasing } from '@tonic-ui/utils';
import React, { forwardRef, useEffect, useRef } from 'react';
import { isValidElementType } from 'react-is';
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
            {children ?? (isValidElementType(IconComponent) && <IconComponent size="4x" />)}
          </Box>
        );
      }}
    </Transition>
  );
});

MenuToggleIcon.displayName = 'MenuToggleIcon';

export default MenuToggleIcon;
