import { useMergeRefs, useOnceWhen } from '@tonic-ui/react-hooks';
import { callAll, callEventHandlers, warnDeprecatedProps } from '@tonic-ui/utils';
import { ensureArray, ensureFunction } from 'ensure-type';
import { forwardRef, useEffect, useMemo, useRef } from 'react';
import { useSlot } from '../slot';
import { useDefaultProps } from '../default-props';
import { Popper } from '../popper';
import { Collapse } from '../transitions';
import { useSubmenuContentStyle } from './styles';
import useMenu from './useMenu';
import useSubmenu from './useSubmenu';

const SubmenuContent = forwardRef((inProps, ref) => {
  const {
    PopperComponent, // deprecated
    PopperProps, // deprecated
    TransitionComponent, // deprecated
    TransitionProps, // deprecated
    slots = {},
    slotProps = {},
    children,
    onKeyDown: onKeyDownProp,
    onMouseEnter: onMouseEnterProp,
    onMouseLeave: onMouseLeaveProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'SubmenuContent' });

  { // deprecation warning
    const prefix = `${SubmenuContent.displayName}:`;
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
  const mouseLeaveTimeoutRef = useRef();
  const menuContext = useMenu(); // context might be an undefined value
  const submenuContext = useSubmenu(); // context might be an undefined value
  const {
    submenuContentRefs,
  } = { ...menuContext };
  const {
    focusOnFirstItem,
    focusOnLastItem,
    focusOnNextItem,
    focusOnPreviousItem,
    focusOnSubmenuTrigger,
    isHoveringSubmenuContentRef,
    isHoveringSubmenuTriggerRef,
    isOpen,
    offset,
    onClose: closeSubmenu,
    placement,
    portalled,
    submenuId,
    submenuTriggerId,
    submenuTriggerRef,
    submenuContentRef,
  } = { ...submenuContext };

  // Register/unregister submenu content ref with parent menu to handle portal-rendered submenus
  useEffect(() => { // eslint-disable-line consistent-return
    const submenuContentSet = submenuContentRefs?.current;
    if (submenuContentSet && submenuContentRef) {
      // Register submenu content ref
      submenuContentSet.add(submenuContentRef);
      return () => {
        // Unregister submenu content ref
        submenuContentSet.delete(submenuContentRef);
      };
    }
  }, [submenuContentRefs, submenuContentRef]);

  const eventHandler = {};

  eventHandler.onMouseEnter = function (event) {
    isHoveringSubmenuContentRef.current = true;

    if (mouseLeaveTimeoutRef.current) {
      clearTimeout(mouseLeaveTimeoutRef.current);
      mouseLeaveTimeoutRef.current = undefined;
    }
  };

  eventHandler.onMouseLeave = function (event) {
    isHoveringSubmenuContentRef.current = false;

    if (mouseLeaveTimeoutRef.current) {
      clearTimeout(mouseLeaveTimeoutRef.current);
      mouseLeaveTimeoutRef.current = undefined;
    }
    mouseLeaveTimeoutRef.current = setTimeout(() => {
      mouseLeaveTimeoutRef.current = undefined;
      if (!isHoveringSubmenuTriggerRef.current && !isHoveringSubmenuContentRef.current) {
        ensureFunction(closeSubmenu)();
      }
    }, 100); // XXX: keep opening Submenu when cursor quickly move between SubmenuToggle and SubmenuContent
  };

  // Keyboard navigation for submenu content
  eventHandler.onKeyDown = function (event) {
    const key = event?.key;
    const shiftKey = event?.shiftKey;

    // Determine the close direction based on placement
    // For 'right-start' or 'right-end', ArrowLeft closes the submenu
    // For 'left-start' or 'left-end', ArrowRight closes the submenu
    const isRightPlacement = placement?.startsWith('right');
    const closeKey = isRightPlacement ? 'ArrowLeft' : 'ArrowRight';

    // Navigate submenu items using keyboard
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

    // Close submenu and return focus to toggle
    if (key === closeKey || key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      ensureFunction(focusOnSubmenuTrigger)();
      ensureFunction(closeSubmenu)();
    }
  };

  const tabIndex = -1;
  const styleProps = useSubmenuContentStyle({ tabIndex });

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
      {
        // https://popper.js.org/docs/v2/modifiers/event-listeners/
        name: 'eventListeners',
        options: {
          scroll: false, // Disable scroll event listener to prevent scrolling the popper element with the reference element
          resize: true, // Keep resize event listener enabled (default behavior)
        },
      },
    ];
    return modifiers;
  }, [skidding, distance]);

  const [PopperSlot, popperSlotProps] = useSlot({
    name: 'popper',
    ownerDisplayName: SubmenuContent.displayName,
    props: {
      ref: submenuContentRef,
      'aria-labelledby': submenuTriggerId,
      'data-submenu-id': submenuId,
      id: submenuId,
      isOpen,
      placement,
      referenceRef: submenuTriggerRef,
      role: 'menu',
      tabIndex,
      unmountOnExit: true,
      portalled,
      willUseTransition: true,
      zIndex: 'dropdown',
    },
    slot: slots.popper ?? PopperComponent ?? Popper,
    slotProps: { ...PopperProps, ...slotProps.popper },
  });

  const [TransitionSlot, transitionSlotProps] = useSlot({
    name: 'transition',
    ownerDisplayName: SubmenuContent.displayName,
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
      modifiers={[
        ...popperModifiers,
        ...ensureArray(popperSlotProps?.modifiers),
      ]}
      onKeyDown={callEventHandlers(onKeyDownProp, eventHandler.onKeyDown)}
      onMouseEnter={callEventHandlers(onMouseEnterProp, eventHandler.onMouseEnter)}
      onMouseLeave={callEventHandlers(onMouseLeaveProp, eventHandler.onMouseLeave)}
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

SubmenuContent.displayName = 'SubmenuContent';

export default SubmenuContent;
