import { useMergeRefs } from '@tonic-ui/react-hooks';
import { ariaAttr, createTransitionStyle, getEnterTransitionProps, getExitTransitionProps, reflow, transitionEasing } from '@tonic-ui/utils';
import { ensureBoolean } from 'ensure-type';
import React, { forwardRef, useEffect, useRef } from 'react';
import { Transition } from 'react-transition-group';
import { Box } from '../box';
import { Icon } from '../icon';
import {
  useTreeNodeToggleIconStyle,
} from './styles';
import useTreeNode from './useTreeNode';

const mapStateToVariantStyle = (state, props) => {
  const variantStyle = {
    entering: (props) => ({
      transform: 'rotate(90deg)',
    }),
    entered: (props) => ({
      transform: 'rotate(90deg)',
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

const TreeNodeToggleIcon = forwardRef((
  {
    appear = false, // do not perform the enter transition when it first mounts
    children,
    disabled: disabledProp,
    easing = defaultEasing,
    nodeId,
    style,
    timeout = defaultTimeout,
    ...rest
  },
  ref,
) => {
  const context = useTreeNode(nodeId); // context might be an undefined value
  const nodeRef = useRef(null);
  const combinedRef = useMergeRefs(nodeRef, ref);
  const isDisabled = ensureBoolean(disabledProp ?? context?.isDisabled);
  const isExpanded = ensureBoolean(context?.isExpanded);
  const toggleIconStyleProps = useTreeNodeToggleIconStyle({ isDisabled });

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
          'aria-disabled': ariaAttr(isDisabled),
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

        const iconName = 'angle-right';

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

TreeNodeToggleIcon.displayName = 'TreeNodeToggleIcon';

export default TreeNodeToggleIcon;
