import { useMergeRefs } from '@tonic-ui/react-hooks';
import { callAllEventHandlers } from '@tonic-ui/utils';
import React, { forwardRef, useRef } from 'react';
import { Box } from '../box';
import { useSubmenuListStyle } from './styles';
import useSubmenu from './useSubmenu';

const SubmenuList = forwardRef((
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
    isHoveringSubmenuListRef,
    isHoveringSubmenuToggleRef,
    isOpen,
    onClose,
    placement,
    submenuId,
    submenuRef,
    submenuToggleId,
  } = { ...submenuContext };
  const combinedRef = useMergeRefs(submenuRef, ref);
  const styleProps = useSubmenuListStyle({ isOpen, placement });
  const onMouseEnter = callAllEventHandlers(onMouseEnterProp, () => {
    isHoveringSubmenuListRef.current = true;

    if (mouseLeaveTimeoutRef.current) {
      clearTimeout(mouseLeaveTimeoutRef.current);
      mouseLeaveTimeoutRef.current = undefined;
    }
  });
  const onMouseLeave = callAllEventHandlers(onMouseLeaveProp, () => {
    isHoveringSubmenuListRef.current = false;

    if (mouseLeaveTimeoutRef.current) {
      clearTimeout(mouseLeaveTimeoutRef.current);
      mouseLeaveTimeoutRef.current = undefined;
    }
    mouseLeaveTimeoutRef.current = setTimeout(() => {
      mouseLeaveTimeoutRef.current = undefined;
      if (!isHoveringSubmenuToggleRef.current && !isHoveringSubmenuListRef.current) {
        onClose();
      }
    }, 100); // XXX: keep opening submenu when cursor quickly move between SubmenuToggle and SubmenuList
  });

  return (
    <Box
      ref={combinedRef}
      aria-labelledby={submenuToggleId}
      data-submenu-id={submenuId}
      id={submenuId}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...styleProps}
      {...rest}
    />
  );
});

SubmenuList.displayName = 'SubmenuList';

export default SubmenuList;
