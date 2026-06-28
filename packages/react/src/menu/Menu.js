import { useId, usePrevious } from '@tonic-ui/react-hooks';
import { getAllFocusable, runIfFn } from '@tonic-ui/utils';
import { ensureString } from 'ensure-type';
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import config from '../shared/config';
import useShallowMemo from '../utils/useShallowMemo';
import { MenuContext } from './context';
import { useMenuStyle } from './styles';

const mapPlacementToDirection = (placement) => {
  const p0 = ensureString(placement).split('-')[0];
  const direction = {
    top: 'up',
    bottom: 'down',
  }[p0];

  return direction;
};

/**
 * @typedef {Object} MenuProps
 * @property {HTMLElement | null} [anchorEl] - The element to which the menu is attached.
 * @property {boolean} [autoSelect=true] - Whether to automatically select the first menu item when the menu is opened.
 * @property {React.ReactNode | ((context: { isOpen: boolean; onClose: () => void; onOpen: () => void; onToggle: () => void; placement: string }) => React.ReactNode)} [children] - A function child can be used intead of a React element. This function is called with the context object.
 * @property {boolean} [closeOnBlur=true] - Whether to close the menu when the user clicks outside of the menu.
 * @property {boolean} [closeOnSelect=true] - Whether to close the menu when the user selects a menu item.
 * @property {number} [defaultActiveIndex=-1] - The index of the menu item to be selected by default.
 * @property {boolean} [defaultIsOpen=false] - Whether the menu is open by default.
 * @property {boolean} [isOpen] - Whether the menu is open.
 * @property {boolean} [matchWidth=false] - If `true`, sizes the menu to match the toggle's width on every update.
 * @property {[number, number]} [offset=[0, 0]] - The skidding and distance of the menu.
 * @property {() => void} [onClose] - Callback when the menu is closed.
 * @property {() => void} [onOpen] - Callback when the menu is opened.
 * @property {boolean} [portalled=false] - If `true`, renders the menu in a portal.
 * @property {'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end'} [placement='bottom-start'] - The placement of the menu.
 * @property {boolean} [returnFocusOnClose=true] - The menu will return the focus to the trigger element when closing. Otherwise, it will leave focus unchanged.
 */

/**
 * @type {ForwardRefComponent<'div', MenuProps>}
 */
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
    matchWidth = false,
    offset,
    onClose: onCloseProp,
    onOpen: onOpenProp,
    portalled,
    placement = 'bottom-start', // One of: 'top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end'
    returnFocusOnClose = true,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Menu' });
  const shallowMemo = useShallowMemo();
  const menuContentRef = useRef(null);
  const menuToggleRef = useRef(null);
  // The `submenuContentRefs` is used to store refs of submenu contents for detecting clicks outside the menu and its submenus
  const submenuContentRefs = useRef(new Set());
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

  const onOpen = useCallback(() => {
    const isControlled = (isOpenProp !== undefined);
    if (!isControlled) {
      setIsOpen(true);
    }

    if (typeof onOpenProp === 'function') {
      onOpenProp();
    }
  }, [isOpenProp, onOpenProp]);

  const onToggle = useCallback(() => {
    if (isOpen) {
      onClose();
    } else {
      onOpen();

      // If `autoSelect` is true, focus on the first item when the menu opens with a mouse click
      autoSelect && focusOnFirstItem();
    }
  }, [autoSelect, isOpen, focusOnFirstItem, onClose, onOpen]);

  if (anchorEl) {
    menuToggleRef.current = anchorEl;
  }

  const defaultId = useId();
  const menuId = `${config.name}:Menu-${defaultId}`;
  const menuToggleId = `${config.name}:MenuToggle-${defaultId}`;
  const direction = mapPlacementToDirection(placement);
  const context = shallowMemo({
    autoSelect,
    closeOnBlur,
    closeOnSelect,
    direction,
    focusOnFirstItem,
    focusOnLastItem,
    focusOnNextItem,
    focusOnPreviousItem,
    isOpen,
    matchWidth,
    offset,
    onClose,
    onOpen,
    onToggle,
    portalled,
    placement,
    menuId,
    menuContentRef,
    menuToggleId,
    menuToggleRef,
    submenuContentRefs,
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
