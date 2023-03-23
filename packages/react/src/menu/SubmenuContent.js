import { useMergeRefs } from '@tonic-ui/react-hooks';
import { callEventHandlers } from '@tonic-ui/utils';
import { ensureFunction } from 'ensure-type';
import React, { forwardRef, useRef } from 'react';
import { Box } from '../box';
import { useSubmenuContentStyle } from './styles';
import useSubmenu from './useSubmenu';

const SubmenuContent = forwardRef((
  {
    onMouseEnter: onMouseEnterProp,
    onMouseLeave: onMouseLeaveProp,
    ...rest
  },
  ref,
) => {
  const mouseLeaveTimeoutRef = useRef();
  const submenuContext = useSubmenu(); // context might be an undefined value
  const {
    isHoveringSubmenuContentRef,
    isHoveringSubmenuToggleRef,
    onClose: closeSubmenu,
    submenuId,
    submenuContentRef,
    submenuToggleId,
  } = { ...submenuContext };
  const combinedRef = useMergeRefs(submenuContentRef, ref);
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
      if (!isHoveringSubmenuToggleRef.current && !isHoveringSubmenuContentRef.current) {
        ensureFunction(closeSubmenu)();
      }
    }, 100); // XXX: keep opening submenu when cursor quickly move between SubmenuToggle and SubmenuContent
  };

  const tabIndex = -1;
  const styleProps = useSubmenuContentStyle({ tabIndex });

  return (
    <Box
      ref={combinedRef}
      aria-labelledby={submenuToggleId}
      data-submenu-id={submenuId}
      id={submenuId}
      onMouseEnter={callEventHandlers(onMouseEnterProp, eventHandler.onMouseEnter)}
      onMouseLeave={callEventHandlers(onMouseLeaveProp, eventHandler.onMouseLeave)}
      {...styleProps}
      {...rest}
    />
  );
});

SubmenuContent.displayName = 'SubmenuContent';

export default SubmenuContent;
