import { useMergeRefs } from '@tonic-ui/react-hooks';
import { ariaAttr, callEventHandlers } from '@tonic-ui/utils';
import { ensureFunction } from 'ensure-type';
import React, { forwardRef } from 'react';
import { ButtonBase } from '../button';
import { useDefaultProps } from '../default-props';
import useButtonEventHandlers from '../utils/useButtonEventHandlers';
import { useSubmenuTriggerStyle } from './styles';
import useMenu from './useMenu';
import useSubmenu from './useSubmenu';

/**
 * SubmenuTrigger acts as a menu item that opens a submenu when interacted with.
 * It combines MenuItem functionality with submenu trigger behavior for a cleaner API.
 */
const SubmenuTrigger = forwardRef((inProps, ref) => {
  const {
    children,
    disabled,
    onClick: onClickProp,
    onFocus: onFocusProp,
    onKeyDown: onKeyDownProp,
    onMouseEnter: onMouseEnterProp,
    onMouseLeave: onMouseLeaveProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'SubmenuTrigger' });

  const menuContext = useMenu(); // context might be an undefined value
  const {
    closeOnSelect,
    onClose: closeMenu,
  } = { ...menuContext };

  const submenuContext = useSubmenu(); // context might be an undefined value
  const {
    focusOnFirstItem,
    isHoveringSubmenuContentRef,
    isHoveringSubmenuTriggerRef,
    isOpen,
    onClose: closeSubmenu,
    onOpen: openSubmenu,
    placement,
    submenuId,
    submenuTriggerId,
    submenuTriggerRef,
  } = { ...submenuContext };

  const combinedRef = useMergeRefs(submenuTriggerRef, ref);
  const tabIndex = -1;
  const styleProps = useSubmenuTriggerStyle({ tabIndex });

  const mouseLeaveTimeoutRef = React.useRef();

  // Use button event handlers for click and Enter/Space key activation
  const { onClick, onKeyDown } = useButtonEventHandlers({
    disabled,
    onActivate: () => closeOnSelect && ensureFunction(closeMenu)(),
  });

  const eventHandler = {};

  eventHandler.onMouseEnter = function (event) {
    if (disabled) {
      event.preventDefault();
      return;
    }

    isHoveringSubmenuTriggerRef.current = true;
    if (mouseLeaveTimeoutRef.current) {
      clearTimeout(mouseLeaveTimeoutRef.current);
      mouseLeaveTimeoutRef.current = undefined;
    }

    ensureFunction(openSubmenu)();
  };

  eventHandler.onMouseLeave = function (event) {
    if (disabled) {
      event.preventDefault();
      return;
    }

    isHoveringSubmenuTriggerRef.current = false;
    if (mouseLeaveTimeoutRef.current) {
      clearTimeout(mouseLeaveTimeoutRef.current);
      mouseLeaveTimeoutRef.current = undefined;
    }
    mouseLeaveTimeoutRef.current = setTimeout(() => {
      mouseLeaveTimeoutRef.current = undefined;
      if (!isHoveringSubmenuTriggerRef.current && !isHoveringSubmenuContentRef.current) {
        ensureFunction(closeSubmenu)();
      }
    }, 100);
  };

  // Keyboard navigation for submenu trigger
  eventHandler.onKeyDown = function (event) {
    if (disabled) {
      return;
    }

    const key = event?.key;

    // Determine the open/close direction based on placement
    // For 'right-start' or 'right-end', ArrowRight opens the submenu
    // For 'left-start' or 'left-end', ArrowLeft opens the submenu
    const isRightPlacement = placement?.startsWith('right');
    const openKey = isRightPlacement ? 'ArrowRight' : 'ArrowLeft';
    const closeKey = isRightPlacement ? 'ArrowLeft' : 'ArrowRight';

    if (key === openKey) {
      event.preventDefault();
      event.stopPropagation();
      ensureFunction(openSubmenu)();
      // Use requestAnimationFrame to ensure the submenu content is rendered in the DOM
      // before attempting to focus. Without this, focusOnFirstItem would run before
      // React has painted the newly opened submenu, resulting in an empty element list.
      requestAnimationFrame(() => {
        ensureFunction(focusOnFirstItem)();
      });
    }

    // Close submenu with closeKey (ArrowLeft for right placement) or Escape when submenu is open
    if ((key === closeKey || key === 'Escape') && isOpen) {
      event.preventDefault();
      event.stopPropagation();
      ensureFunction(closeSubmenu)();
    }
  };

  return (
    <ButtonBase
      ref={combinedRef}
      role="menuitem"
      tabIndex={tabIndex}
      disabled={disabled}
      aria-disabled={ariaAttr(disabled)}
      aria-controls={submenuId}
      aria-expanded={ariaAttr(isOpen)}
      aria-haspopup="menu"
      id={submenuTriggerId}
      onClick={callEventHandlers(onClickProp, onClick)}
      onFocus={callEventHandlers(onFocusProp, eventHandler.onFocus)}
      onKeyDown={callEventHandlers(onKeyDownProp, onKeyDown, eventHandler.onKeyDown)}
      onMouseEnter={callEventHandlers(onMouseEnterProp, eventHandler.onMouseEnter)}
      onMouseLeave={callEventHandlers(onMouseLeaveProp, eventHandler.onMouseLeave)}
      {...styleProps}
      {...rest}
    >
      {children}
    </ButtonBase>
  );
});

SubmenuTrigger.displayName = 'SubmenuTrigger';

export default SubmenuTrigger;
