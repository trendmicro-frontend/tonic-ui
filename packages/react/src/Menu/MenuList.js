import React from 'react';
import Popper from '../Popper/Popper';
import wrapEvent from '../utils/wrapEvent';
import { useMenuListStyle } from './styles';
import useMenu from './useMenu';

const MenuList = ({
  skidding = 0,
  distance = 0,
  onBlur: onBlurProp,
  onKeyDown: onKeyDownProp,
  ...props
}) => {
  const menuContext = useMenu(); // context might be an undefined value
  const {
    activeIndex: index,
    isOpen,
    focusAtIndex,
    focusOnFirstItem,
    focusOnLastItem,
    closeMenu,
    focusableItems,
    menuToggleRef,
    menuId,
    buttonId,
    menuRef,
    closeOnBlur,
    placement,
    onKeyDown,
    onBlur,
  } = { ...menuContext };

  const handleKeyDown = event => {
    const count = focusableItems.current.length;
    let nextIndex;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      nextIndex = (index + 1) % count;
      focusAtIndex(nextIndex);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      nextIndex = (index - 1 + count) % count;
      focusAtIndex(nextIndex);
    } else if (event.key === 'Home') {
      focusOnFirstItem();
    } else if (event.key === 'End') {
      focusOnLastItem();
    } else if (event.key === 'Tab') {
      event.preventDefault();
    } else if (event.key === 'Escape') {
      closeMenu();
    }

    onKeyDown && onKeyDown(event);
  };

  // Close the menu on blur
  const handleBlur = event => {
    const target = event.relatedTarget || document.activeElement;
    if (
      closeOnBlur &&
      isOpen &&
      menuRef.current &&
      menuToggleRef.current &&
      !menuRef.current.contains(target) &&
      !menuToggleRef.current.contains(target)
    ) {
      closeMenu();
    }

    onBlur && onBlur(event);
  };

  const styleProps = useMenuListStyle();

  return (
    <Popper
      usePortal={false}
      isOpen={isOpen}
      anchorEl={menuToggleRef.current}
      placement={placement}
      modifiers={{ offset: [skidding, distance] }}
      role="menu"
      ref={menuRef}
      id={menuId}
      aria-labelledby={buttonId}
      onBlur={wrapEvent(onBlurProp, handleBlur)}
      onKeyDown={wrapEvent(onKeyDownProp, handleKeyDown)}
      zIndex="dropdown"
      tabIndex={-1}
      _focus={{ outline: 0 }}
      {...styleProps}
      {...props}
    />
  );
};

MenuList.displayName = 'MenuList';

export default MenuList;