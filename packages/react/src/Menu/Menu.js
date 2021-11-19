import { ensureString } from 'ensure-type';
import React, { useEffect, useRef, useState } from 'react';
import Box from '../Box';
import config from '../shared/config';
import { useId } from '../utils/autoId';
import getFocusableElements from '../utils/getFocusableElements';
import { MenuProvider } from './context';
import usePrevious from '../utils/usePrevious';

const mapPlacementToDirection = (placement) => {
  const p0 = ensureString(placement).split('-')[0];
  const direction = {
    top: 'up',
    bottom: 'down',
    left: 'left',
    right: 'right',
  }[p0];

  return direction;
};

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
  const menuId = `${config.name}:menu-${useId()}`;
  const menuTriggerId = `${config.name}:menu-trigger-${useId()}`;
  const focusableItems = useRef([]);
  const menuRef = useRef(null);
  const menuTriggerRef = useRef(null);
  const direction = mapPlacementToDirection(placement);

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
      menuTriggerRef.current && menuTriggerRef.current.focus();
    }
    if (activeIndex === -1 && _isOpen) {
      menuRef.current && menuRef.current.focus();
    }
  }, [activeIndex, _isOpen, menuTriggerRef, menuRef, wasPreviouslyOpen]);

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

  const focusOnFirstItem = () => {
    setActiveIndex(0);
  };

  const focusOnLastItem = () => {
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
    menuTriggerRef.current = anchorEl;
  }

  const context = {
    activeIndex,
    autoSelect,
    closeMenu,
    closeOnBlur,
    closeOnSelect,
    direction,
    focusAtIndex,
    focusOnFirstItem,
    focusOnLastItem,
    focusableItems,
    isOpen: _isOpen,
    onKeyDown,
    onBlur,
    openMenu,
    placement,
    menuId,
    menuRef,
    menuTriggerId,
    menuTriggerRef,
  };

  return (
    <MenuProvider value={context}>
      <Box
        position="relative"
        display="inline-block"
        {...props}
      >
        {(typeof children === 'function') ? children(context) : children}
      </Box>
    </MenuProvider>
  );
};

Menu.displayName = 'Menu';

export default Menu;
