import { useMergeRefs } from '@tonic-ui/react-hooks';
import { callAll, callEventHandlers } from '@tonic-ui/utils';
import { ensureArray, ensureFunction } from 'ensure-type';
import React, { forwardRef, useMemo, useRef } from 'react';
import { Popper } from '../popper';
import { Collapse } from '../transitions';
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
  const combinedRef = useMergeRefs(nodeRef, ref);
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

  /**
   * Navigate the menu items using keyboard.
   */
  const handleKeyDown = event => {
    const key = event?.key;
    const shiftKey = event?.shiftKey;

    // Prevents default page scrolling for ArrowDown, ArrowUp, End, Home, and Tab keys.
    if (key === 'ArrowDown') {
      event.preventDefault();
      ensureFunction(focusOnNextItem)();
    }
    if (key === 'ArrowUp') {
      event.preventDefault();
      ensureFunction(focusOnPreviousItem)();
    }
    if (key === 'End') {
      event.preventDefault();
      ensureFunction(focusOnLastItem)();
    }
    if (key === 'Home') {
      event.preventDefault();
      ensureFunction(focusOnFirstItem)();
    }
    if (key === 'Tab') {
      event.preventDefault();
      ensureFunction(shiftKey ? focusOnPreviousItem : focusOnNextItem)();
    }

    // Closes menu on pressing the Escape key.
    if (key === 'Escape') {
      ensureFunction(closeMenu)();
    }

    ensureFunction(onKeyDown)(event);
  };

  const styleProps = useMenuContentStyle();

  const eventHandlers = {
    onBlur: callEventHandlers(onBlurProp, handleBlur),
    onKeyDown: callEventHandlers(onKeyDownProp, handleKeyDown),
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
            onEnter={callAll(
              onEnter,
              TransitionProps?.onEnter,
            )}
            onExited={callAll(
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
