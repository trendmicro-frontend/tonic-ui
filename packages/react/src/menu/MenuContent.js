import chainedFunction from 'chained-function';
import {
  ensureArray,
  ensureFunction,
} from 'ensure-type';
import React, { forwardRef, useMemo, useRef } from 'react';
import { Popper } from '../popper';
import { Collapse } from '../transitions';
import useForkRef from '../utils/useForkRef';
import wrapEvent from '../utils/wrapEvent';
import { useMenuContentStyle } from './styles';
import useMenu from './useMenu';

const MenuContent = forwardRef((
  {
    PopperComponent = Popper,
    PopperProps,
    TransitionComponent = Collapse,
    TransitionProps,
    children,
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
    offset,
    onBlur,
    onClose: closeMenu,
    onKeyDown,
    placement,
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

  const styleProps = useMenuContentStyle();

  const eventHandlers = {
    onBlur: wrapEvent(onBlurProp, handleBlur),
    onKeyDown: wrapEvent(onKeyDownProp, handleKeyDown),
  };

  const [
    skidding = 0,
    distance = 0,
  ] = ensureArray(offset);
  const popperModifiers = useMemo(() => {
    const modifiers = [
      { // https://popper.js.org/docs/v2/modifiers/offset/
        name: 'offset',
        options: {
          offset: [skidding, distance],
        },
      },
    ];
    return modifiers;
  }, [skidding, distance]);

  return (
    <PopperComponent
      aria-labelledby={menuToggleId}
      anchorEl={menuToggleRef?.current}
      data-menu-id={menuId}
      id={menuId}
      isOpen={isOpen}
      modifiers={popperModifiers}
      placement={placement}
      ref={menuRef}
      role="menu"
      tabIndex={-1}
      unmountOnExit={true}
      usePortal={false} // Pass `true` in `PopperProps` to render menu in a portal
      willUseTransition={true}
      zIndex="dropdown"
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

MenuContent.displayName = 'MenuContent';

export default MenuContent;
