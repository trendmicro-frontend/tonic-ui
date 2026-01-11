import { useId } from '@tonic-ui/react-hooks';
import { getAllFocusable, runIfFn } from '@tonic-ui/utils';
import memoize from 'micro-memoize';
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import config from '../shared/config';
import { SubmenuContext } from './context';
import { useSubmenuStyle } from './styles';

const getMemoizedState = memoize(state => ({ ...state }));

const Submenu = forwardRef((inProps, ref) => {
  const {
    children,
    defaultIsOpen = false,
    isOpen: isOpenProp,
    offset,
    onClose: onCloseProp,
    onOpen: onOpenProp,
    placement = 'right-start', // One of: 'right-start', 'right-end', 'left-start', 'left-end'
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Submenu' });
  const submenuContentRef = useRef(null);
  const submenuToggleRef = useRef(null);
  const isHoveringSubmenuContentRef = useRef();
  const isHoveringSubmenuToggleRef = useRef();
  const [isOpen, setIsOpen] = useState(isOpenProp ?? defaultIsOpen);
  const [activeIndex, setActiveIndex] = useState(-1);

  const getFocusableElements = useCallback(() => {
    if (!submenuContentRef.current) {
      return [];
    }
    const focusableElements = getAllFocusable(submenuContentRef.current)
      .filter(node => (node.getAttribute('role') === 'menuitem'));
    return focusableElements;
  }, []);

  useEffect(() => {
    const isControlled = (isOpenProp !== undefined);
    if (isControlled) {
      setIsOpen(isOpenProp);
    }
  }, [isOpenProp]);

  const onClose = useCallback(() => {
    const isControlled = (isOpenProp !== undefined);
    if (!isControlled) {
      setIsOpen(false);
    }

    if (typeof onCloseProp === 'function') {
      onCloseProp();
    }

    // Reset active index and tab indices when closing
    setActiveIndex(-1);
    const focusableElements = getFocusableElements();
    focusableElements.forEach(node => node.setAttribute('tabindex', -1));
  }, [getFocusableElements, isOpenProp, onCloseProp]);

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
    // Use requestAnimationFrame to ensure submenu content is rendered
    requestAnimationFrame(() => {
      const focusableElements = getFocusableElements();
      if (focusableElements.length > 0) {
        setActiveIndex(0);
        const el = focusableElements[0];
        el && el.focus();
        focusableElements.forEach((node, index) => {
          node.setAttribute('tabindex', index === 0 ? 0 : -1);
        });
      }
    });
  }, [getFocusableElements]);

  const focusOnLastItem = useCallback(() => {
    requestAnimationFrame(() => {
      const focusableElements = getFocusableElements();
      if (focusableElements.length > 0) {
        const lastIndex = focusableElements.length - 1;
        setActiveIndex(lastIndex);
        const el = focusableElements[lastIndex];
        el && el.focus();
        focusableElements.forEach((node, index) => {
          node.setAttribute('tabindex', index === lastIndex ? 0 : -1);
        });
      }
    });
  }, [getFocusableElements]);

  const focusOnNextItem = useCallback(() => {
    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
      const nextIndex = (activeIndex + 1) % focusableElements.length;
      setActiveIndex(nextIndex);
      const el = focusableElements[nextIndex];
      el && el.focus();
      focusableElements.forEach((node, index) => {
        node.setAttribute('tabindex', index === nextIndex ? 0 : -1);
      });
    }
  }, [activeIndex, getFocusableElements]);

  const focusOnPreviousItem = useCallback(() => {
    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
      const prevIndex = (activeIndex - 1 + focusableElements.length) % focusableElements.length;
      setActiveIndex(prevIndex);
      const el = focusableElements[prevIndex];
      el && el.focus();
      focusableElements.forEach((node, index) => {
        node.setAttribute('tabindex', index === prevIndex ? 0 : -1);
      });
    }
  }, [activeIndex, getFocusableElements]);

  const focusOnSubmenuToggle = useCallback(() => {
    const el = submenuToggleRef.current;
    el && el.focus();
  }, []);

  const defaultId = useId();
  const submenuId = `${config.name}:Submenu-${defaultId}`;
  const submenuToggleId = `${config.name}:SubmenuToggle-${defaultId}`;
  const styleProps = useSubmenuStyle();

  const context = getMemoizedState({
    focusOnFirstItem,
    focusOnLastItem,
    focusOnNextItem,
    focusOnPreviousItem,
    focusOnSubmenuToggle,
    isHoveringSubmenuContentRef,
    isHoveringSubmenuToggleRef,
    isOpen,
    offset,
    onClose,
    onOpen,
    placement,
    submenuId,
    submenuToggleId,
    submenuContentRef,
    submenuToggleRef,
  });

  return (
    <SubmenuContext.Provider value={context}>
      <Box
        ref={ref}
        {...styleProps}
        {...rest}
      >
        {runIfFn(children, context)}
      </Box>
    </SubmenuContext.Provider>
  );
});

Submenu.displayName = 'Submenu';

export default Submenu;
