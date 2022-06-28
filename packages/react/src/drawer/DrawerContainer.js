import { useMergeRefs } from '@tonic-ui/react-hooks';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import {
  useDrawerContainerStyle,
} from './styles';
import useDrawer from './useDrawer';

const DrawerContainer = forwardRef((props, ref) => {
  const drawerContext = useDrawer(); // context might be an undefined value
  const {
    backdrop,
    closeOnOutsideClick,
    onClose,
    placement,
    containerRef, // internal use only
  } = { ...drawerContext };
  const combinedRef = useMergeRefs(containerRef, ref);
  const styleProps = useDrawerContainerStyle({ backdrop, placement });
  const containerProps = {
    ref: combinedRef,
    onClick: (event) => {
      event.stopPropagation();
      if (closeOnOutsideClick) {
        (typeof onClose === 'function') && onClose(event);
      }
    },
    ...styleProps,
    ...props,
  };

  return (
    <Box {...containerProps} />
  );
});

DrawerContainer.displayName = 'DrawerContainer';

export default DrawerContainer;
