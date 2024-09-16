import { usePrevious } from '@tonic-ui/react-hooks';
import { getAllFocusable, runIfFn } from '@tonic-ui/utils';
import { ensureString } from 'ensure-type';
import memoize from 'micro-memoize';
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import config from '../shared/config';
import useAutoId from '../utils/useAutoId';
import { MenuContext } from './context';
import { useMenuStyle } from './styles';

const getMemoizedState = memoize(state => ({ ...state }));

const mapPlacementToDirection = (placement) => {
  const p0 = ensureString(placement).split('-')[0];
  const direction = {
    top: 'up',
    bottom: 'down',
  }[p0];

  return direction;
};

const Menu = forwardRef((inProps, ref) => {
  const {
    anchorEl,
    autoSelect = false,
    children,
    closeOnBlur = true,
    closeOnSelect = true,
    defaultActiveIndex = -1,
    defaultIsOpen = false,
    isOpen: isOpenProp,
    offset,
    onClose: onCloseProp,
    onOpen: onOpenProp,
    placement = 'bottom-start', // One of: 'top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end'
    returnFocusOnClose = true,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Menu' });
  const menuContentRef = useRef(null);
  const menuToggleRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const [isOpen, setIsOpen] = useState(isOpenProp ?? defaultIsOpen);
  const prevIsOpen = usePrevious(isOpen);
  const getFocusableElements = useCallback(() => {
    if (!menuContentRef.current) {
      return [];
    }
    const focusableElements = getAllFocusable(menuContentRef.current)
      .filter(node => (node.getAttribute('role') === 'menuitem'));
    return focusableElements;
  }, []);

  useEffect(() => {
    const isControlled = (isOpenProp !== undefined);
    if (isControlled) {
      setIsOpen(isOpenProp);
    }
  }, [isOpenProp]);

  useEffect(() => {
    if (isOpen) {
      // Use requestAnimationFrame to ensure that the menu is rendered before we try to focus on it.
      requestAnimationFrame(() => {
        const focusableElements = getFocusableElements();
        focusableElements.forEach((node, index) => (index === 0) && node.setAttribute('tabindex', 0));
      });
    }
  }, [isOpen, getFocusableElements]);

  useEffect(() => {
    if (activeIndex !== -1) {
      // Use requestAnimationFrame to ensure that the focus is set at the end of the current frame
      requestAnimationFrame(() => {
        const focusableElements = getFocusableElements();
        const el = focusableElements[activeIndex];
        el && el.focus();

        focusableElements.forEach((node, index) => {
          if (index === activeIndex) {
            node.setAttribute('tabindex', 0);
          } else {
            node.setAttribute('tabindex', -1);
          }
        });
      });
    }
    if (activeIndex === -1 && !isOpen && prevIsOpen && returnFocusOnClose) {
      // Use requestAnimationFrame to ensure that the focus is set at the end of the current frame
      requestAnimationFrame(() => {
        const el = menuToggleRef.current;
        el && el.focus();
      });
    }
    if (activeIndex === -1 && isOpen && !prevIsOpen) {
      // Use requestAnimationFrame to ensure that the focus is set at the end of the current frame
      requestAnimationFrame(() => {
        const el = menuContentRef.current;
        el && el.focus();
      });
    }
  }, [isOpen, activeIndex, getFocusableElements, menuContentRef, menuToggleRef, prevIsOpen, returnFocusOnClose]);

  const onOpen = useCallback(() => {
    const isControlled = (isOpenProp !== undefined);
    if (!isControlled) {
      setIsOpen(true);
    }

    if (typeof onOpenProp === 'function') {
      onOpenProp();
    }
  }, [isOpenProp, onOpenProp]);

  const focusOnFirstItem = useCallback(() => {
    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
      setActiveIndex(0);
    }
  }, [getFocusableElements]);

  const focusOnLastItem = useCallback(() => {
    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
      setActiveIndex(focusableElements.length - 1);
    }
  }, [getFocusableElements]);

  const focusOnNextItem = useCallback(() => {
    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
      const nextIndex = (activeIndex + 1) % focusableElements.length;
      setActiveIndex(nextIndex);
    }
  }, [activeIndex, getFocusableElements]);

  const focusOnPreviousItem = useCallback(() => {
    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
      const prevIndex = (activeIndex - 1 + focusableElements.length) % focusableElements.length;
      setActiveIndex(prevIndex);
    }
  }, [activeIndex, getFocusableElements]);

  const onClose = useCallback(() => {
    const isControlled = (isOpenProp !== undefined);
    if (!isControlled) {
      setIsOpen(false);
    }

    if (typeof onCloseProp === 'function') {
      onCloseProp();
    }

    setActiveIndex(defaultActiveIndex);

    // Reset tab index
    const focusableElements = getFocusableElements();
    focusableElements.forEach(node => node.setAttribute('tabindex', -1));
  }, [getFocusableElements, isOpenProp, onCloseProp, defaultActiveIndex]);

  if (anchorEl) {
    menuToggleRef.current = anchorEl;
  }

  const defaultId = useAutoId();
  const menuId = `${config.name}:Menu-${defaultId}`;
  const menuToggleId = `${config.name}:MenuToggle-${defaultId}`;
  const direction = mapPlacementToDirection(placement);
  const context = getMemoizedState({
    autoSelect,
    closeOnBlur,
    closeOnSelect,
    direction,
    focusOnFirstItem,
    focusOnLastItem,
    focusOnNextItem,
    focusOnPreviousItem,
    isOpen,
    offset,
    onClose,
    onOpen,
    placement,
    menuId,
    menuContentRef,
    menuToggleId,
    menuToggleRef,
  });
  const styleProps = useMenuStyle({});

  return (
    <MenuContext.Provider value={context}>
      <Box
        ref={ref}
        {...styleProps}
        {...rest}
      >
        {runIfFn(children, context)}
      </Box>
    </MenuContext.Provider>
  );
});

Menu.displayName = 'Menu';

export default Menu;
