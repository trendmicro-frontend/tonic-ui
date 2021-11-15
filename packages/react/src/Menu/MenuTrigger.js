import React, { forwardRef } from 'react';
import Box from '../Box';
import wrapEvent from '../utils/wrapEvent';
import useForkRef from '../utils/useForkRef';
import {
  useMenuTriggerStyle,
} from './styles';
import useMenu from './useMenu';

const MenuTrigger = forwardRef((
  {
    onClick,
    onKeyDown,
    children,
    disabled,
    ...props
  },
  ref,
) => {
  const menuContext = useMenu();
  const {
    isOpen,
    focusOnLastItem,
    focusOnFirstItem,
    closeMenu,
    menuId,
    menuTriggerId,
    autoSelect,
    openMenu,
    menuTriggerRef,
  } = menuContext;
  const styleProps = useMenuTriggerStyle();
  const combinedRef = useForkRef(menuTriggerRef, ref);
  const handleClick = wrapEvent(onClick, (event) => {
    // Don't handle `onClick` event when the `MenuTrigger` is disabled
    if (disabled) {
      event.preventDefault();
      return;
    }

    if (isOpen) {
      closeMenu();
      return;
    }

    openMenu();

    // If `autoSelect` is true, focus on the first item when the menu opens with a mouse click
    autoSelect && focusOnFirstItem();
  });
  const handleKeyDown = wrapEvent(onKeyDown, event => {
    // Don't handle `onKeyDown` event when the `MenuTrigger` is disabled
    if (disabled) {
      event.preventDefault();
      return;
    }

    if (event.key === 'ArrowDown') {
      openMenu();

      // Focus on the first item when the menu opens with the down arrow
      focusOnFirstItem();
      return;
    }

    if (event.key === 'ArrowUp') {
      openMenu();

      // Focus on the last item when the menu opens with the up arrow
      focusOnLastItem();
      return;
    }
  });

  const getMenuTriggerProps = () => ({
    'aria-active': isOpen,
    'aria-controls': menuId,
    'aria-disabled': disabled,
    'aria-expanded': isOpen,
    'aria-haspopup': 'menu',
    disabled,
    id: menuTriggerId,
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    ref: combinedRef,
    role: 'button',
    tabIndex: 0,
    ...styleProps,
    ...props,
  });

  if (typeof children === 'function') {
    return children({
      getMenuTriggerProps,
      isOpen,
      openMenu,
      closeMenu,
    });
  }

  return (
    <Box {...getMenuTriggerProps()}>
      {children}
    </Box>
  );
});

MenuTrigger.displayName = 'MenuTrigger';

export default MenuTrigger;
