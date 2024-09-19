import { useMergeRefs } from '@tonic-ui/react-hooks';
import { ariaAttr, callEventHandlers } from '@tonic-ui/utils';
import { ensureFunction } from 'ensure-type';
import React, { forwardRef, useRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import {
  useSubmenuToggleStyle,
} from './styles';
import useSubmenu from './useSubmenu';

const SubmenuToggle = forwardRef((inProps, ref) => {
  const {
    children,
    disabled,
    onMouseEnter: onMouseEnterProp,
    onMouseLeave: onMouseLeaveProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'SubmenuToggle' });
  const mouseLeaveTimeoutRef = useRef();
  const submenuContext = useSubmenu(); // context might be an undefined value
  const {
    isHoveringSubmenuContentRef,
    isHoveringSubmenuToggleRef,
    isOpen,
    onClose: closeSubmenu,
    onOpen: openSubmenu,
    submenuId,
    submenuToggleId,
    submenuToggleRef,
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
    }, 100); // XXX: keep opening popover when cursor quickly move between trigger and content
  };

  const getSubmenuToggleProps = () => ({
    'aria-controls': submenuId,
    'aria-disabled': ariaAttr(disabled),
    'aria-expanded': ariaAttr(isOpen),
    'aria-haspopup': 'menu',
    disabled,
    id: submenuToggleId,
    onMouseEnter: callEventHandlers(onMouseEnterProp, eventHandler.onMouseEnter),
    onMouseLeave: callEventHandlers(onMouseLeaveProp, eventHandler.onMouseLeave),
    ref: combinedRef,
    role: 'presentation',
    ...styleProps,
    ...rest,
  });

  if (typeof children === 'function') {
    return children({
      getSubmenuToggleProps,
    });
  }

  return (
    <Box {...getSubmenuToggleProps()}>
      {children}
    </Box>
  );
});

SubmenuToggle.displayName = 'SubmenuToggle';

export default SubmenuToggle;
