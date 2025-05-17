import { ariaAttr, callEventHandlers } from '@tonic-ui/utils';
import { ensureFunction } from 'ensure-type';
import React, { forwardRef, useCallback } from 'react';
import { ButtonBase } from '../button';
import { useDefaultProps } from '../default-props';
import useInteractiveActionHandlers from '../utils/useInteractiveActionHandlers';
import {
  useTreeItemToggleStyle,
} from './styles';
import useTreeItem from './useTreeItem';

const TreeItemToggle = forwardRef((inProps, ref) => {
  const {
    children,
    disabled,
    onClick: onClickProp,
    onKeyDown: onKeyDownProp,
    onKeyUp: onKeyUpProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'TreeItemToggle' });
  const {
    isExpanded,
    toggleExpansion,
  } = useTreeItem();
  const preventNodeSelection = useCallback((event) => {
    // Stop event bubbling to prevent the node from being selected
    event.stopPropagation();
  }, []);
  const styleProps = useTreeItemToggleStyle();

  const { onClick, onKeyDown, onKeyUp } = useInteractiveActionHandlers({
    disabled,
    onAction: () => ensureFunction(toggleExpansion)(),
  });

  const getTreeItemToggleProps = () => ({
    'aria-disabled': ariaAttr(disabled),
    'aria-expanded': ariaAttr(isExpanded),
    disabled,
    onClick: callEventHandlers(onClickProp, preventNodeSelection, onClick),
    onKeyDown: callEventHandlers(onKeyDownProp, preventNodeSelection, onKeyDown),
    onKeyUp: callEventHandlers(onKeyUpProp, preventNodeSelection, onKeyUp),
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
