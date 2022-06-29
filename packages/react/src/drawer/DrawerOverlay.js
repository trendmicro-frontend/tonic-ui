import { useMergeRefs } from '@tonic-ui/react-hooks';
import { callAll } from '@tonic-ui/utils';
import React, { forwardRef, useRef } from 'react';
import { useAnimatePresence } from '../utils/animate-presence';
import { Fade } from '../transitions';
import {
  useDrawerOverlayStyle,
} from './styles';
import useDrawer from './useDrawer';

const DrawerOverlay = forwardRef(({
  TransitionComponent = Fade,
  TransitionProps,
  ...rest
}, ref) => {
  const drawerContext = useDrawer(); // context might be an undefined value
  const {
    isOpen,
  } = { ...drawerContext };
  const [, safeToRemove] = useAnimatePresence();
  const overlayRef = useRef();
  const combinedRef = useMergeRefs(overlayRef, ref);
  const styleProps = useDrawerOverlayStyle();
  const overlayProps = {
    ref: combinedRef,
    ...styleProps,
    ...rest,
  };

  return (
    <TransitionComponent
      appear={!!drawerContext}
      {...TransitionProps}
      {...overlayProps}
      in={drawerContext ? isOpen : true}
      onExited={callAll(safeToRemove, TransitionProps?.onExited)}
    />
  );
});

DrawerOverlay.displayName = 'DrawerOverlay';

export default DrawerOverlay;
