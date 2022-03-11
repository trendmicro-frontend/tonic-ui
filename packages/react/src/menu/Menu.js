import { usePrevious } from '@tonic-ui/react-hooks';
import { ensureString } from 'ensure-type';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Box } from '../box';
import config from '../shared/config';
import getFocusableElements from '../utils/getFocusableElements';
import runIfFn from '../utils/runIfFn';
import useAutoId from '../utils/useAutoId';
import { MenuProvider } from './context';
import { useMenuStyle } from './styles';

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
    onBlur,
    onClose,
    onKeyDown,
    onOpen,
    placement = 'bottom-start', // One of: 'top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end'
    ...rest
  },
  ref,
) => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const [isOpen, setIsOpen] = useState(defaultIsOpen);
  const [focusableElements, setFocusableElements] = useState([]);
  const { current: isControlled } = useRef(isOpenProp != null);
  const _isOpen = isControlled ? isOpenProp : isOpen;
  const defaultId = useAutoId();
  const menuId = `${config.name}:Menu-${defaultId}`;
  const menuToggleId = `${config.name}:MenuToggle-${defaultId}`;
  const menuRef = useRef(null);
  const menuToggleRef = useRef(null);
  const direction = mapPlacementToDirection(placement);

  useEffect(() => {
    if (_isOpen) {
      // Use requestAnimationFrame to ensure that the menu is rendered before we try to focus on it.
      requestAnimationFrame(() => {
        const nextFocusableElements = getFocusableElements(menuRef?.current).filter(node => node.getAttribute('role') === 'menuitem');
        setFocusableElements(nextFocusableElements);

        // Init tab index
        nextFocusableElements.forEach((node, index) => (index === 0) && node.setAttribute('tabindex', 0));
      });
    }
  }, [_isOpen]);

  const wasPreviouslyOpen = usePrevious(_isOpen);

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
    if (activeIndex === -1 && !_isOpen && wasPreviouslyOpen) {
      // Use requestAnimationFrame to ensure that the focus is set at the end of the current frame
      requestAnimationFrame(() => {
        const el = menuToggleRef.current;
        el && el.focus();
      });
    }
    if (activeIndex === -1 && _isOpen) {
      // Use requestAnimationFrame to ensure that the focus is set at the end of the current frame
      requestAnimationFrame(() => {
        const el = menuRef.current;
        el && el.focus();
      });
    }
  }, [_isOpen, activeIndex, focusableElements, menuRef, menuToggleRef, wasPreviouslyOpen]);

  const openMenu = () => {
    if (!isControlled) {
      setIsOpen(true);
    }

    if (onOpen) {
      onOpen();
    }
  };

  const focusOnFirstItem = () => {
    if (focusableElements.length > 0) {
      setActiveIndex(0);
    }
  };

  const focusOnLastItem = () => {
    if (focusableElements.length > 0) {
      setActiveIndex(focusableElements.length - 1);
    }
  };

  const focusOnNextItem = () => {
    if (focusableElements.length > 0) {
      const nextIndex = (activeIndex + 1) % focusableElements.length;
      setActiveIndex(nextIndex);
    }
  };

  const focusOnPreviousItem = () => {
    if (focusableElements.length > 0) {
      const prevIndex = (activeIndex - 1 + focusableElements.length) % focusableElements.length;
      setActiveIndex(prevIndex);
    }
  };

  const closeMenu = () => {
    if (!isControlled) {
      setIsOpen(false);
    }

    if (onClose) {
      onClose();
    }

    setActiveIndex(-1);

    // Reset tab index
    focusableElements.forEach(node => node.setAttribute('tabindex', -1));
  };

  if (anchorEl) {
    menuToggleRef.current = anchorEl;
  }

  const context = {
    autoSelect,
    closeMenu,
    closeOnBlur,
    closeOnSelect,
    direction,
    focusOnFirstItem,
    focusOnLastItem,
    focusOnNextItem,
    focusOnPreviousItem,
    isOpen: _isOpen,
    onBlur,
    onKeyDown,
    openMenu,
    placement,
    menuId,
    menuRef,
    menuToggleId,
    menuToggleRef,
  };

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
