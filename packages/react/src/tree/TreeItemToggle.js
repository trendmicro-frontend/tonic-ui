import { ariaAttr, callEventHandlers } from '@tonic-ui/utils';
import React, { forwardRef, useCallback } from 'react';
import { ButtonBase } from '../button';
import { useDefaultProps } from '../default-props';
import {
  useTreeItemToggleStyle,
} from './styles';
import useTreeItem from './useTreeItem';

const TreeItemToggle = forwardRef((inProps, ref) => {
  const {
    children,
    disabled,
    onClick: onClickProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'TreeItemToggle' });
  const {
    isExpanded,
    toggleExpansion,
  } = useTreeItem();
  const styleProps = useTreeItemToggleStyle();
  const onClick = useCallback((event) => {
    // Stop event bubbling to prevent the node from being selected
    event.stopPropagation();

    toggleExpansion();
  }, [toggleExpansion]);

  const getTreeItemToggleProps = () => ({
    'aria-disabled': ariaAttr(disabled),
    'aria-expanded': ariaAttr(isExpanded),
    disabled,
    onClick: callEventHandlers(onClickProp, onClick),
    ref,
    role: 'button',
    tabIndex: 0,
    ...styleProps,
    ...rest,
  });

  if (typeof children === 'function') {
    return children({
      getTreeItemToggleProps,
    });
  }

  return (
    <ButtonBase {...getTreeItemToggleProps()}>
      {children}
    </ButtonBase>
  );
});

TreeItemToggle.displayName = 'TreeItemToggle';

export default TreeItemToggle;
