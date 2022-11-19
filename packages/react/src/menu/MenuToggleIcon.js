import { useMergeRefs } from '@tonic-ui/react-hooks';
import { ariaAttr, createTransitionStyle, getEnterTransitionProps, getExitTransitionProps, reflow, transitionEasing } from '@tonic-ui/utils';
import React, { forwardRef, useEffect, useRef } from 'react';
import { Transition } from 'react-transition-group';
import { Box } from '../box';
import { Icon } from '../icon';
import {
  useMenuToggleIconStyle,
} from './styles';
import useMenu from './useMenu';

const mapDirectionToIconName = (direction) => {
  const iconName = {
    up: 'angle-up',
    down: 'angle-down',
    left: 'angle-left',
    right: 'angle-right',
  }[direction];

  return iconName;
};

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

const MenuToggleIcon = forwardRef((
  {
    appear = false, // do not perform the enter transition when it first mounts
    children,
    disabled,
    easing = defaultEasing,
    style,
    timeout = defaultTimeout,
    ...rest
  },
  ref,
) => {
  const menuContext = useMenu(); // context might be an undefined value
  const {
    isOpen,
    direction,
  } = { ...menuContext };
  const menuIndicatorStyleProps = useMenuToggleIconStyle();
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
          ...menuIndicatorStyleProps,
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

        const iconName = mapDirectionToIconName(direction);

        return (
          <Box
            ref={combinedRef}
            {...styleProps}
            {...childProps}
            style={style}
          >
            {children ?? <Icon width="4x" icon={iconName} />}
          </Box>
        );
      }}
    </Transition>
  );
});

MenuToggleIcon.displayName = 'MenuToggleIcon';

export default MenuToggleIcon;
