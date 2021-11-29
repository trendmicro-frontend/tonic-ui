import React, { useEffect, useRef, useState } from 'react';
import { useId } from '../utils/autoId';
import getFocusableElements from '../utils/getFocusableElements';
import { MenuContextProvider } from './context';
import usePrevious from '../utils/usePrevious';
import Box from '../Box';

const Menu = ({
  anchorEl,
  children,
  isOpen: isOpenProp,
  defaultIsOpen,
  onOpen,
  onClose,
  autoSelect = false,
  closeOnBlur = true,
  closeOnSelect = true,
  defaultActiveIndex,
  placement = 'bottom-start',
  onKeyDown,
  onBlur,
  ...props
}) => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex || -1);
  const [isOpen, setIsOpen] = useState(defaultIsOpen || false);
  const { current: isControlled } = useRef(isOpenProp != null);

  const _isOpen = isControlled ? isOpenProp : isOpen;

  const menuId = `menu-${useId()}`;
  const buttonId = `menubutton-${useId()}`;

  const focusableItems = useRef([]);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (_isOpen && menuRef && menuRef.current) {
      let focusables = getFocusableElements(menuRef.current).filter(node => node.getAttribute('role') === 'menuitem');
      focusableItems.current = menuRef.current ? focusables : [];
      initTabIndex();
    }
  }, [_isOpen]);

  const updateTabIndex = index => {
    if (focusableItems.current.length > 0) {
      let nodeAtIndex = focusableItems.current[index];
      focusableItems.current.forEach(node => {
        if (node !== nodeAtIndex) {
          node.setAttribute('tabindex', -1);
        }
      });
      nodeAtIndex.setAttribute('tabindex', 0);
    }
  };

  const resetTabIndex = () => {
    if (focusableItems.current) {
      focusableItems.current.forEach(node => node.setAttribute('tabindex', -1));
    }
  };

  const initTabIndex = () => {
    focusableItems.current.forEach(
      (node, index) => index === 0 && node.setAttribute('tabindex', 0),
    );
  };

  const wasPreviouslyOpen = usePrevious(_isOpen);

  useEffect(() => {
    if (activeIndex !== -1) {
      focusableItems.current[activeIndex] &&
        focusableItems.current[activeIndex].focus();
      updateTabIndex(activeIndex);
    }
    if (activeIndex === -1 && !_isOpen && wasPreviouslyOpen) {
      buttonRef.current && buttonRef.current.focus();
    }
    if (activeIndex === -1 && _isOpen) {
      menuRef.current && menuRef.current.focus();
    }
  }, [activeIndex, _isOpen, buttonRef, menuRef, wasPreviouslyOpen]);

  const focusOnFirstItem = () => {
    openMenu();
    setActiveIndex(0);
  };

  const openMenu = () => {
    if (!isControlled) {
      setIsOpen(true);
    }

    if (onOpen) {
      onOpen();
    }
  };

  const focusAtIndex = index => {
    setActiveIndex(index);
  };

  const focusOnLastItem = () => {
    openMenu();
    setActiveIndex(focusableItems.current.length - 1);
  };

  const closeMenu = () => {
    if (!isControlled) {
      setIsOpen(false);
    }

    if (onClose) {
      onClose();
    }

    setActiveIndex(-1);
    resetTabIndex();
  };

  if (anchorEl) {
    buttonRef.current = anchorEl;
  }

  const context = {
    activeIndex,
    isOpen: _isOpen,
    focusAtIndex,
    focusOnLastItem,
    focusOnFirstItem,
    closeMenu,
    buttonRef,
    menuRef,
    focusableItems,
    placement,
    menuId,
    buttonId,
    openMenu,
    autoSelect,
    closeOnSelect,
    closeOnBlur,
    onKeyDown,
    onBlur,
  };

  const styleProps = {
    position: 'relative',
  };

  return (
    <Box {...styleProps} {...props}>
      <MenuContextProvider value={context}>
        {typeof children === 'function'
          ? children({ isOpen: _isOpen, onClose: closeMenu })
          : children }
      </MenuContextProvider>
    </Box>
  );
};

Menu.displayName = 'Menu';

export default Menu;
