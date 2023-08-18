import { ariaAttr, callEventHandlers } from '@tonic-ui/utils';
import React, { forwardRef, useCallback } from 'react';
import { ButtonBase } from '../button';
import {
  useTreeNodeToggleStyle,
} from './styles';
import useTreeNode from './useTreeNode';

const TreeNodeToggle = forwardRef((
  {
    children,
    disabled,
    onClick: onClickProp,
    ...rest
  },
  ref,
) => {
  const {
    isExpanded,
    toggleExpansion,
  } = useTreeNode();
  const styleProps = useTreeNodeToggleStyle();
  const onClick = useCallback((event) => {
    // Stop event bubbling to prevent the node from being selected
    event.stopPropagation();

    toggleExpansion();
  }, [toggleExpansion]);

  const getTreeNodeToggleProps = () => ({
    'aria-disabled': ariaAttr(disabled),
    'aria-expanded': ariaAttr(isExpanded),
    disabled,
    onClick: callEventHandlers(onClickProp, onClick),
    ref,
    ...styleProps,
    ...rest,
  });

  if (typeof children === 'function') {
    return children({
      getTreeNodeToggleProps,
    });
  }

  return (
    <ButtonBase {...getTreeNodeToggleProps()}>
      {children}
    </ButtonBase>
  );
});

TreeNodeToggle.displayName = 'TreeNodeToggle';

export default TreeNodeToggle;
