import { useClickOutside, useMergeRefs, useOnceWhen } from '@tonic-ui/react-hooks';
import { callAll, callEventHandlers, warnDeprecatedProps } from '@tonic-ui/utils';
import { ensureArray, ensureFunction } from 'ensure-type';
import React, { forwardRef, useMemo, useRef } from 'react';
import { useSlot } from '../slot';
import { useDefaultProps } from '../default-props';
import { Popper } from '../popper';
import { Collapse } from '../transitions';
import { useMenuContentStyle } from './styles';
import useMenu from './useMenu';

/**
 * @typedef {Object} MenuContentProps
 * @property {React.ReactNode} [children] - The content of the menu.
 * @property {React.ElementType} [PopperComponent=Popper] - **Deprecated.** Use `slots.popper` instead. The component used for the popover.
 * @property {object} [PopperProps] - **Deprecated.** Use `slotProps.popper` instead. Props applied to the Popper component.
 * @property {{ popper?: object; transition?: object }} [slotProps] - Props forwarded to internal slots. `slotProps.popper` / `slotProps.transition` are applied to the Popper / transition elements.
 * @property {{ popper?: React.ElementType; transition?: React.ElementType }} [slots] - Slot components. `slots.popper` replaces the default `Popper`; `slots.transition` replaces the default `Collapse`.
 * @property {React.ElementType} [TransitionComponent=Collapse] - **Deprecated.** Use `slots.transition` instead. The component used for the transition.
 * @property {{ appear?: boolean; timeout?: number | { appear?: number; enter?: number; exit?: number } }} [TransitionProps] - **Deprecated.** Use `slotProps.transition` instead. Props applied to the transition element.
 */

/**
 * @type {ForwardRefComponent<'div', MenuContentProps>}
 */
const MenuContent = forwardRef((inProps, ref) => {
  const {
    closeOnBlur, // deprecated
    PopperComponent, // deprecated
    PopperProps, // deprecated
    TransitionComponent, // deprecated
    TransitionProps, // deprecated
    slots = {},
    slotProps = {},
    children,
    onBlur: onBlurProp,
    onKeyDown: onKeyDownProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'MenuContent' });

  { // deprecation warning
    const prefix = `${MenuContent.displayName}:`;
    useOnceWhen(() => {
      warnDeprecatedProps('closeOnBlur', {
        prefix,
        alternative: 'closeOnInteractOutside',
        willRemove: true,
      });
    }, closeOnBlur !== undefined);
    useOnceWhen(() => {
      warnDeprecatedProps('TransitionComponent', {
        prefix,
        alternative: 'slots.transition',
        willRemove: true,
      });
    }, TransitionComponent !== undefined);
    useOnceWhen(() => {
      warnDeprecatedProps('TransitionProps', {
        prefix,
        alternative: 'slotProps.transition',
        willRemove: true,
      });
    }, TransitionProps !== undefined);
    useOnceWhen(() => {
      warnDeprecatedProps('PopperComponent', {
        prefix,
        alternative: 'slots.popper',
        willRemove: true,
      });
    }, PopperComponent !== undefined);
    useOnceWhen(() => {
      warnDeprecatedProps('PopperProps', {
        prefix,
        alternative: 'slotProps.popper',
        willRemove: true,
      });
    }, PopperProps !== undefined);
  }
  const nodeRef = useRef(null);
  const combinedRef = useMergeRefs(nodeRef, ref);
  const menuContext = useMenu(); // context might be an undefined value
  const {
    closeOnInteractOutside,
    isOpen,
    focusOnFirstItem,
    focusOnLastItem,
    focusOnNextItem,
    focusOnPreviousItem,
    menuId,
    menuToggleId,
    menuToggleRef,
    menuContentRef,
    matchWidth,
    offset,
    onClose: closeMenu,
    onInteractOutside,
    placement,
    portalled,
    submenuContentRefs,
  } = { ...menuContext };
  const eventHandler = {};

  useClickOutside([menuContentRef, menuToggleRef], (event) => {
    if (!isOpen) {
      return;
    }

    // Submenu contents are mounted and unmounted dynamically, so the ref set is
    // read at click time to keep portalled submenu content interactions internal.
    const submenuContentSet = submenuContentRefs?.current;
    if (submenuContentSet?.size) {
      // Portalled submenu clicks can be retargeted to a shadow host.
      // The composed path identifies the submenu content as an internal boundary.
      const eventPath = event.composedPath?.();
      for (const submenuContentRef of submenuContentSet) {
        const submenuContent = submenuContentRef?.current;
        if (submenuContent && (submenuContent.contains(event.target) || eventPath?.includes(submenuContent))) {
          return;
        }
      }
    }

    onInteractOutside?.(event);

    const shouldClose = Boolean(closeOnInteractOutside);
    if (shouldClose && !event.defaultPrevented) {
      ensureFunction(closeMenu)();
    }
  }, { events: ['click'] });

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

  const [PopperSlot, popperSlotProps] = useSlot({
    name: 'popper',
    ownerName: MenuContent.displayName,
    props: {
      ref: menuContentRef,
      'aria-labelledby': menuToggleId,
      'data-menu-id': menuId,
      id: menuId,
      isOpen,
      placement,
      referenceRef: menuToggleRef,
      role: 'menu',
      tabIndex,
      matchWidth,
      unmountOnExit: true,
      portalled,
      willUseTransition: true,
      zIndex: 'dropdown',
    },
    slot: slots.popper ?? PopperComponent ?? Popper,
    slotProps: { ...PopperProps, ...slotProps.popper },
  });

  const mergedPopperModifiers = useMemo(() => [
    ...popperModifiers,
    ...ensureArray(popperSlotProps?.modifiers),
  ], [popperModifiers, popperSlotProps?.modifiers]);

  const [TransitionSlot, transitionSlotProps] = useSlot({
    name: 'transition',
    ownerName: MenuContent.displayName,
    props: {
      ref: combinedRef,
      appear: true,
      easing: 'linear',
      timeout: {
        enter: 133,
        exit: Math.floor(133 * 0.7),
      },
    },
    slot: slots.transition ?? TransitionComponent ?? Collapse,
    slotProps: { ...TransitionProps, ...slotProps.transition },
  });

  return (
    <PopperSlot
      {...popperSlotProps}
      modifiers={mergedPopperModifiers}
      onBlur={onBlurProp}
      onKeyDown={callEventHandlers(onKeyDownProp, eventHandler.onKeyDown)}
      {...styleProps}
      {...rest}
    >
      {({ placement, transition }) => {
        const { in: inProp, onEnter, onExited } = { ...transition };
        return (
          <TransitionSlot
            {...transitionSlotProps}
            in={inProp}
            onEnter={callAll(
              onEnter,
              transitionSlotProps.onEnter,
            )}
            onExited={callAll(
              onExited,
              transitionSlotProps.onExited,
            )}
          >
            {children}
          </TransitionSlot>
        );
      }}
    </PopperSlot>
  );
});

MenuContent.displayName = 'MenuContent';

export default MenuContent;
