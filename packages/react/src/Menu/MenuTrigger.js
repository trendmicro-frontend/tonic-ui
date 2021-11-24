import { ensureFunction } from 'ensure-type';
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
    ...rest
  },
  ref,
) => {
  const menuContext = useMenu(); // context might be an undefined value
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
  } = { ...menuContext };
  const styleProps = useMenuTriggerStyle();
  const combinedRef = useForkRef(menuTriggerRef, ref);
  const handleClick = wrapEvent(onClick, (event) => {
    // Don't handle `onClick` event when the `MenuTrigger` is disabled
    if (disabled) {
      event.preventDefault();
      return;
    }

    if (isOpen) {
      ensureFunction(closeMenu)();
      return;
    }

    ensureFunction(openMenu)();

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
      ensureFunction(openMenu)();

      // Focus on the first item when the menu opens with the down arrow
      ensureFunction(focusOnFirstItem)();
      return;
    }

    if (event.key === 'ArrowUp') {
      ensureFunction(openMenu)();

      // Focus on the last item when the menu opens with the up arrow
      ensureFunction(focusOnLastItem)();
      return;
    }
  });

  const getMenuTriggerProps = () => ({
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
    ...rest,
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
