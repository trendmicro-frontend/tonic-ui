import { useMergeRefs, useOnceWhen } from '@tonic-ui/react-hooks';
import { callAll, warnDeprecatedProps } from '@tonic-ui/utils';
import React, { forwardRef, useRef } from 'react';
import { useSlot } from '../slot';
import { useDefaultProps } from '../default-props';
import { useAnimatePresence } from '../utils/animate-presence';
import { Fade } from '../transitions';
import {
  useDrawerOverlayStyle,
} from './styles';
import useDrawer from './useDrawer';

/**
 * @typedef {Object} DrawerOverlayProps
 * @property {{ transition?: object }} [slotProps] - Props forwarded to the internal transition slot.
 * @property {{ transition?: React.ElementType }} [slots] - Slot components. `slots.transition` replaces the default `Fade`.
 * @property {React.ElementType} [TransitionComponent=Fade] - **Deprecated.** Use `slots.transition` instead. The component used for the transition.
 * @property {{ appear?: boolean; timeout?: number | { appear?: number; enter?: number; exit?: number } }} [TransitionProps] - **Deprecated.** Use `slotProps.transition` instead. Props applied to the transition element.
 */

/**
 * @type {ForwardRefComponent<'div', DrawerOverlayProps>}
 */
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
    ownerName: DrawerOverlay.displayName,
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
