import { useMergeRefs } from '@tonic-ui/react-hooks';
import { callEventHandlers } from '@tonic-ui/utils';
import { ensureFunction } from 'ensure-type';
import React, { forwardRef, useRef } from 'react';
import { Box } from '../box';
import {
  useSubmenuToggleStyle,
} from './styles';
import useSubmenu from './useSubmenu';

const SubmenuToggle = forwardRef((
  {
    children,
    disabled,
    onMouseEnter: onMouseEnterProp,
    onMouseLeave: onMouseLeaveProp,
    ...rest
  },
  ref,
) => {
  const mouseLeaveTimeoutRef = useRef();
  const submenuContext = useSubmenu(); // context might be an undefined value
  const {
    isHoveringSubmenuListRef,
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
  const handleMouseEnter = callEventHandlers(onMouseEnterProp, (event) => {
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
  });
  const handleMouseLeave = callEventHandlers(onMouseLeaveProp, (event) => {
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
      if (!isHoveringSubmenuToggleRef.current && !isHoveringSubmenuListRef.current) {
        ensureFunction(closeSubmenu)();
      }
    }, 100); // XXX: keep opening popover when cursor quickly move between trigger and content
  });

  const getSubmenuToggleProps = () => ({
    'aria-controls': submenuId,
    'aria-disabled': disabled,
    'aria-expanded': isOpen,
    'aria-haspopup': 'menu',
    disabled,
    id: submenuToggleId,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
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
