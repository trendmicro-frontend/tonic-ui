import { ensureFunction } from 'ensure-type';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import wrapEvent from '../utils/wrapEvent';
import useForkRef from '../utils/useForkRef';
import {
  useMenuToggleStyle,
} from './styles';
import useMenu from './useMenu';

const MenuToggle = forwardRef((
  {
    onClick: onClickProp,
    onKeyDown: onKeyDownProp,
    children,
    disabled,
    ...rest
  },
  ref,
) => {
  const menuContext = useMenu(); // context might be an undefined value
  const {
    autoSelect,
    focusOnLastItem,
    focusOnFirstItem,
    isOpen,
    menuId,
    menuToggleId,
    menuToggleRef,
    onClose: closeMenu,
    onOpen: openMenu,
  } = { ...menuContext };
  const styleProps = useMenuToggleStyle();
  const combinedRef = useForkRef(menuToggleRef, ref);
  const handleClick = wrapEvent(onClickProp, (event) => {
    // Don't handle `onClick` event when the `MenuToggle` is disabled
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
  const handleKeyDown = wrapEvent(onKeyDownProp, event => {
    // Don't handle `onKeyDown` event when the `MenuToggle` is disabled
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

  const getMenuToggleProps = () => ({
    'aria-controls': menuId,
    'aria-disabled': disabled,
    'aria-expanded': isOpen,
    'aria-haspopup': 'menu',
    disabled,
    id: menuToggleId,
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
      getMenuToggleProps,
    });
  }

  return (
    <Box {...getMenuToggleProps()}>
      {children}
    </Box>
  );
});

MenuToggle.displayName = 'MenuToggle';

export default MenuToggle;
