import { useMergeRefs, useOnceWhen } from '@tonic-ui/react-hooks';
import { callAll, warnDeprecatedProps } from '@tonic-ui/utils';
import React, { forwardRef, useRef } from 'react';
import useSlot from '../utils/useSlot';
import { useDefaultProps } from '../default-props';
import { useAnimatePresence } from '../utils/animate-presence';
import { Fade } from '../transitions';
import {
  useDrawerOverlayStyle,
} from './styles';
import useDrawer from './useDrawer';

const DrawerOverlay = forwardRef((inProps, ref) => {
  const {
    TransitionComponent, // deprecated
    TransitionProps, // deprecated
    slots = {},
    slotProps = {},
    ...rest
  } = useDefaultProps({ props: inProps, name: 'DrawerOverlay' });

  { // deprecation warning
    const prefix = `${DrawerOverlay.displayName}:`;
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
  }

  const drawerContext = useDrawer(); // context might be an undefined value
  const {
    isOpen,
  } = { ...drawerContext };
  const [, safeToRemove] = useAnimatePresence();
  const overlayRef = useRef();
  const combinedRef = useMergeRefs(overlayRef, ref);
  const styleProps = useDrawerOverlayStyle();

  const [TransitionSlot, transitionSlotProps] = useSlot({
    name: 'transition',
    ownerDisplayName: DrawerOverlay.displayName,
    props: {
      ref: combinedRef,
      appear: !!drawerContext,
    },
    slot: slots.transition ?? TransitionComponent ?? Fade,
    slotProps: { ...TransitionProps, ...slotProps.transition },
  });

  return (
    <TransitionSlot
      {...transitionSlotProps}
      {...styleProps}
      {...rest}
      in={drawerContext ? isOpen : true}
      onExited={callAll(safeToRemove, transitionSlotProps.onExited)}
    />
  );
});

DrawerOverlay.displayName = 'DrawerOverlay';

export default DrawerOverlay;
