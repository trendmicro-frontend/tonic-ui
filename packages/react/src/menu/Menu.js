import { usePrevious } from '@tonic-ui/react-hooks';
import {
  runIfFn,
} from '@tonic-ui/utils';
import { ensureString } from 'ensure-type';
import memoize from 'micro-memoize';
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { Box } from '../box';
import config from '../shared/config';
import getFocusableElements from '../utils/getFocusableElements';
import useAutoId from '../utils/useAutoId';
import { MenuProvider } from './context';
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

const Menu = forwardRef((
  {
    anchorEl,
    autoSelect = false,
    children,
    closeOnBlur = true,
    closeOnSelect = true,
    defaultActiveIndex = -1,
    defaultIsOpen = false,
    isOpen: isOpenProp,
    offset,
    onBlur: onBlurProp,
    onClose: onCloseProp,
    onKeyDown: onKeyDownProp,
    onOpen: onOpenProp,
    placement = 'bottom-start', // One of: 'top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end'
    ...rest
  },
  ref,
) => {
  const menuRef = useRef(null);
  const menuToggleRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const [focusableElements, setFocusableElements] = useState([]);
  const [isOpen, setIsOpen] = useState(isOpenProp ?? defaultIsOpen);
  const prevIsOpen = usePrevious(isOpen);

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
        const nextFocusableElements = getFocusableElements(menuRef?.current)
          .filter(node => node.getAttribute('role') === 'menuitem');

        setFocusableElements(nextFocusableElements);

        // Init tab index
        nextFocusableElements.forEach((node, index) => (index === 0) && node.setAttribute('tabindex', 0));
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (activeIndex !== -1) {
      // Use requestAnimationFrame to ensure that the focus is set at the end of the current frame
      requestAnimationFrame(() => {
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
    if (activeIndex === -1 && !isOpen && prevIsOpen) {
      // Use requestAnimationFrame to ensure that the focus is set at the end of the current frame
      requestAnimationFrame(() => {
        const el = menuToggleRef.current;
        el && el.focus();
      });
    }
    if (activeIndex === -1 && isOpen) {
      // Use requestAnimationFrame to ensure that the focus is set at the end of the current frame
      requestAnimationFrame(() => {
        const el = menuRef.current;
        el && el.focus();
      });
    }
  }, [isOpen, activeIndex, focusableElements, menuRef, menuToggleRef, prevIsOpen]);

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
    if (focusableElements.length > 0) {
      setActiveIndex(0);
    }
  }, [focusableElements]);

  const focusOnLastItem = useCallback(() => {
    if (focusableElements.length > 0) {
      setActiveIndex(focusableElements.length - 1);
    }
  }, [focusableElements]);

  const focusOnNextItem = useCallback(() => {
    if (focusableElements.length > 0) {
      const nextIndex = (activeIndex + 1) % focusableElements.length;
      setActiveIndex(nextIndex);
    }
  }, [activeIndex, focusableElements]);

  const focusOnPreviousItem = useCallback(() => {
    if (focusableElements.length > 0) {
      const prevIndex = (activeIndex - 1 + focusableElements.length) % focusableElements.length;
      setActiveIndex(prevIndex);
    }
  }, [activeIndex, focusableElements]);

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
    focusableElements.forEach(node => node.setAttribute('tabindex', -1));
  }, [focusableElements, isOpenProp, onCloseProp, defaultActiveIndex]);

  if (anchorEl) {
    menuToggleRef.current = anchorEl;
  }

  const defaultId = useAutoId();
  const menuId = `${config.name}:Menu-${defaultId}`;
  const menuToggleId = `${config.name}:MenuToggle-${defaultId}`;
  const direction = mapPlacementToDirection(placement);
  const context = getMemoizedState({
    closeMenu: onClose, // FIXME: `closeMenu` is deprecated and will be removed in a future release
    openMenu: onOpen, // FIXME: `openMenu` is deprecated and will be removed in a future release
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
    onBlur: onBlurProp,
    onClose,
    onKeyDown: onKeyDownProp,
    onOpen,
    placement,
    menuId,
    menuRef,
    menuToggleId,
    menuToggleRef,
  });
  const styleProps = useMenuStyle({});

  return (
    <MenuProvider value={context}>
      <Box
        ref={ref}
        {...styleProps}
        {...rest}
      >
        {runIfFn(children, context)}
      </Box>
    </MenuProvider>
  );
});

Menu.displayName = 'Menu';

export default Menu;
