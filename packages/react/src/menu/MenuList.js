import chainedFunction from 'chained-function';
import {
  ensureFunction,
} from 'ensure-type';
import React, { forwardRef, useRef } from 'react';
import { Popper } from '../popper';
import { Collapse } from '../transitions';
import useForkRef from '../utils/useForkRef';
import wrapEvent from '../utils/wrapEvent';
import { useMenuListStyle } from './styles';
import useMenu from './useMenu';

const MenuList = forwardRef((
  {
    PopperComponent = Popper,
    PopperProps,
    TransitionComponent = Collapse,
    TransitionProps,
    children,
    offset,
    onBlur: onBlurProp,
    onKeyDown: onKeyDownProp,
    ...rest
  },
  ref,
) => {
  const nodeRef = useRef(null);
  const combinedRef = useForkRef(nodeRef, ref);
  const menuContext = useMenu(); // context might be an undefined value
  const {
    closeMenu,
    closeOnBlur,
    isOpen,
    focusOnFirstItem,
    focusOnLastItem,
    focusOnNextItem,
    focusOnPreviousItem,
    menuId,
    menuToggleId,
    menuToggleRef,
    menuRef,
    onBlur,
    onKeyDown,
    placement,
    usePortal,
  } = { ...menuContext };

  // Close the menu on blur
  const handleBlur = event => {
    const target = event.relatedTarget || document.activeElement;
    const isClickingOutside =
      target &&
      !(menuRef?.current?.contains(target)) &&
      !(menuToggleRef?.current?.contains(target));
    const shouldCloseMenu = isOpen && closeOnBlur && isClickingOutside;

    if (shouldCloseMenu) {
      ensureFunction(closeMenu)();
    }

    ensureFunction(onBlur)(event);
  };

  const handleKeyDown = event => {
    if (event.key === 'ArrowDown' || event.key === 'Tab') {
      event.preventDefault();
      ensureFunction(focusOnNextItem)();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      ensureFunction(focusOnPreviousItem)();
    } else if (event.key === 'Home') {
      event.preventDefault();
      ensureFunction(focusOnFirstItem)();
    } else if (event.key === 'End') {
      event.preventDefault();
      ensureFunction(focusOnLastItem)();
    } else if (event.key === 'Escape') {
      ensureFunction(closeMenu)();
    }

    ensureFunction(onKeyDown)(event);
  };

  const styleProps = useMenuListStyle();

  const eventHandlers = {
    onBlur: wrapEvent(onBlurProp, handleBlur),
    onKeyDown: wrapEvent(onKeyDownProp, handleKeyDown),
  };

  return (
    <PopperComponent
      anchorEl={menuToggleRef?.current}
      aria-labelledby={menuToggleId}
      id={menuId}
      isOpen={isOpen}
      modifiers={{ offset }}
      placement={placement}
      ref={menuRef}
      role="menu"
      tabIndex={-1}
      usePortal={usePortal}
      willUseTransition={true}
      {...styleProps}
      {...eventHandlers}
      {...PopperProps}
      {...rest}
    >
      {({ placement, transition }) => {
        const { in: inProp, onEnter, onExited } = { ...transition };
        return (
          <TransitionComponent
            appear={true}
            easing="linear"
            timeout={{
              enter: 133,
              exit: Math.floor(133 * 0.7),
            }}
            {...TransitionProps}
            ref={combinedRef}
            in={inProp}
            onEnter={chainedFunction(
              onEnter,
              TransitionProps?.onEnter,
            )}
            onExited={chainedFunction(
              onExited,
              TransitionProps?.onExited,
            )}
          >
            {children}
          </TransitionComponent>
        );
      }}
    </PopperComponent>
  );
});

MenuList.displayName = 'MenuList';

export default MenuList;
