import React, {
  forwardRef,
  useEffect,
  useRef,
} from 'react';
import { Transition } from 'react-transition-group';
import Box from '../Box';
import Icon from '../Icon';
import {
  createTransitionStyle,
  getEnterTransitionProps,
  getExitTransitionProps,
  transitionEasing,
} from '../shared/transitions';
import reflow from '../utils/reflow';
import useForkRef from '../utils/useForkRef';
import {
  useMenuToggleIndicatorStyle,
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

const MenuToggleIndicator = forwardRef((
  {
    appear = true,
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
  const menuIndicatorStyleProps = useMenuToggleIndicatorStyle();
  const nodeRef = useRef(null);
  const combinedRef = useForkRef(nodeRef, ref);

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
          'aria-disabled': disabled,
          transition,
        };

        if (typeof children === 'function') {
          return children({
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

MenuToggleIndicator.displayName = 'MenuToggleIndicator';

export default MenuToggleIndicator;
