import { useEventCallback } from '@tonic-ui/react-hooks';
import { ariaAttr, callEventHandlers } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import { ensureFunction } from 'ensure-type';
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
    onKeyDown: onKeyDownProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'TreeItemToggle' });
  const {
    isExpanded,
    toggleExpansion,
  } = useTreeItem();

  const styleProps = useTreeItemToggleStyle();

  const onClick = useEventCallback((event) => {
    // Stop event bubbling to prevent the node from being selected
    event.stopPropagation();

    if (disabled) {
      event.preventDefault();
      return;
    }

    ensureFunction(toggleExpansion)();
  }, [disabled, toggleExpansion]);

  const onKeyDown = useEventCallback((event) => {
    // Stop event bubbling to prevent the node from being selected
    event.stopPropagation();

    if (disabled) {
      event.preventDefault();
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); // Prevent default scrolling for Space

      ensureFunction(toggleExpansion)();
    }
  }, [disabled, toggleExpansion]);

  const getTreeItemToggleProps = () => ({
    'aria-disabled': ariaAttr(disabled),
    'aria-expanded': ariaAttr(isExpanded),
    disabled,
    onClick: callEventHandlers(onClickProp, onClick),
    onKeyDown: callEventHandlers(onKeyDownProp, onKeyDown),
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
