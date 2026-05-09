import { useMergeRefs } from '@tonic-ui/react-hooks';
import { ariaAttr, callEventHandlers, getAllFocusable } from '@tonic-ui/utils';
import { ensureFunction } from 'ensure-type';
import { forwardRef, useRef } from 'react';
import { Box } from '../../box';
import { useDefaultProps } from '../../default-props';
import useSubmenu from '../useSubmenu';
import {
  useSubmenuToggleStyle,
} from './styles';

/**
 * @deprecated SubmenuToggle is deprecated and will be removed in a future version.
 * Use SubmenuTrigger instead, which combines MenuItem functionality with submenu trigger behavior.
 *
 * Migration example:
 * Before:
 *   <SubmenuToggle>
 *     <MenuItem>Submenu</MenuItem>
 *   </SubmenuToggle>
 *
 * After:
 *   <SubmenuTrigger>Submenu</SubmenuTrigger>
 */
const SubmenuToggle = forwardRef((inProps, ref) => {
  const {
    children,
    disabled,
    onFocus: onFocusProp,
    onKeyDown: onKeyDownProp,
    onMouseEnter: onMouseEnterProp,
    onMouseLeave: onMouseLeaveProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'SubmenuToggle' });
  const mouseLeaveTimeoutRef = useRef();
  const submenuContext = useSubmenu(); // context might be an undefined value
  const {
    focusOnFirstItem,
    isHoveringSubmenuContentRef,
    isHoveringSubmenuTriggerRef: isHoveringSubmenuToggleRef,
    isOpen,
    onClose: closeSubmenu,
    onOpen: openSubmenu,
    placement,
    submenuId,
    submenuTriggerId: submenuToggleId,
    submenuTriggerRef: submenuToggleRef,
  } = { ...submenuContext };
  const combinedRef = useMergeRefs(submenuToggleRef, ref);
  const styleProps = useSubmenuToggleStyle();
  const eventHandler = {};

  eventHandler.onMouseEnter = function (event) {
    if (disabled) {
      event.preventDefault();
      return;
    }

    isHoveringSubmenuToggleRef.current = true;
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

    isHoveringSubmenuToggleRef.current = false;
    if (mouseLeaveTimeoutRef.current) {
      clearTimeout(mouseLeaveTimeoutRef.current);
      mouseLeaveTimeoutRef.current = undefined;
    }
    mouseLeaveTimeoutRef.current = setTimeout(() => {
      mouseLeaveTimeoutRef.current = undefined;
      if (!isHoveringSubmenuToggleRef.current && !isHoveringSubmenuContentRef.current) {
        ensureFunction(closeSubmenu)();
      }
    }, 100); // XXX: keep opening Submenu when cursor quickly move between SubmenuToggle and SubmenuContent
  };

  // When used as a wrapper, forward focus to the first focusable element (MenuItem) inside
  eventHandler.onFocus = function (event) {
    if (disabled) {
      return;
    }

    // Only forward focus if the event target is the wrapper itself
    const wrapper = event.currentTarget;
    if (event.target === wrapper) {
      // Find the first focusable element inside the wrapper
      const focusableElements = getAllFocusable(wrapper);
      const firstFocusable = focusableElements[0];
      if (firstFocusable && firstFocusable !== wrapper) {
        firstFocusable.focus();
      }
    }
  };

  // Keyboard navigation for submenu toggle
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

  const getSubmenuToggleProps = () => ({
    'aria-controls': submenuId,
    'aria-disabled': ariaAttr(disabled),
    'aria-expanded': ariaAttr(isOpen),
    'aria-haspopup': 'menu',
    disabled,
    id: submenuToggleId,
    onFocus: callEventHandlers(onFocusProp, eventHandler.onFocus),
    onKeyDown: callEventHandlers(onKeyDownProp, eventHandler.onKeyDown),
    onMouseEnter: callEventHandlers(onMouseEnterProp, eventHandler.onMouseEnter),
    onMouseLeave: callEventHandlers(onMouseLeaveProp, eventHandler.onMouseLeave),
    ref: combinedRef,
    role: 'menuitem',
    tabIndex: -1,
    ...styleProps,
    ...rest,
  });

  if (typeof children === 'function') {
    return children({
      getSubmenuToggleProps,
    });
  }

  // When used as a wrapper, use role="presentation" since the child MenuItem
  // has its own role="menuitem"
  return (
    <Box
      {...getSubmenuToggleProps()}
      role="presentation"
    >
      {children}
    </Box>
  );
});

SubmenuToggle.displayName = 'SubmenuToggle';

export default SubmenuToggle;
