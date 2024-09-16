import { useMergeRefs } from '@tonic-ui/react-hooks';
import { callAll, callEventHandlers } from '@tonic-ui/utils';
import { ensureArray, ensureFunction } from 'ensure-type';
import React, { forwardRef, useMemo, useRef } from 'react';
import { useDefaultProps } from '../default-props';
import { Popper } from '../popper';
import { Collapse } from '../transitions';
import { useMenuContentStyle } from './styles';
import useMenu from './useMenu';

const MenuContent = forwardRef((inProps, ref) => {
  const {
    PopperComponent = Popper,
    PopperProps,
    TransitionComponent = Collapse,
    TransitionProps,
    children,
    onBlur: onBlurProp,
    onKeyDown: onKeyDownProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'MenuContent' });
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
    menuContentRef,
    offset,
    onClose: closeMenu,
    placement,
  } = { ...menuContext };
  const eventHandler = {};

  // Close the menu on blur
  eventHandler.onBlur = function (event) {
    // https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent/relatedTarget
    // The relatedTarget property represents the `EventTarget` receiving focus or losing focus during a `blur` or `focus` event, respectively.
    const focusTarget = event.relatedTarget || document.activeElement; // `relatedTarget` is the `EventTarget` receiving focus (if any)
    const isOutsideMenuToggle = !(menuToggleRef.current?.contains?.(focusTarget));
    const isOutsideMenuContent = !(menuContentRef.current?.contains?.(focusTarget));
    const shouldClose = isOpen && closeOnBlur && !!focusTarget && isOutsideMenuToggle && isOutsideMenuContent;

    if (shouldClose) {
      ensureFunction(closeMenu)();
    }
  };

  // Navigate the menu items using keyboard.
  eventHandler.onKeyDown = function (event) {
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
  };

  const tabIndex = -1;
  const styleProps = useMenuContentStyle({ tabIndex });

  const [
    skidding = 0,
    distance = 0,
  ] = ensureArray(offset);
  const popperModifiers = useMemo(() => {
    const modifiers = [
      { // https://popper.js.org/docs/v2/modifiers/flip/
        name: 'flip',
        enabled: false, // Disable flip functionality
      },
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
      anchorEl={menuToggleRef?.current} // TODO: rename to `referenceRef` in a future release
      data-menu-id={menuId}
      id={menuId}
      isOpen={isOpen}
      placement={placement}
      ref={menuContentRef}
      role="menu"
      tabIndex={tabIndex}
      unmountOnExit={true}
      usePortal={false} // Pass `true` in `PopperProps` to render menu in a portal
      willUseTransition={true}
      zIndex="dropdown"
      onBlur={callEventHandlers(onBlurProp, eventHandler.onBlur)}
      onKeyDown={callEventHandlers(onKeyDownProp, eventHandler.onKeyDown)}
      {...PopperProps}
      modifiers={[
        // Default modifiers
        ...popperModifiers,
        // User-defined modifiers
        ...ensureArray(PopperProps?.modifiers),
      ]}
      {...styleProps}
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
