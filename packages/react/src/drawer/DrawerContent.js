import { useClickOutside, useMergeRefs, useOnceWhen } from '@tonic-ui/react-hooks';
import { ariaAttr, callAll, callEventHandlers, warnDeprecatedProps } from '@tonic-ui/utils';
import { forwardRef } from 'react';
import useSlot from '../slot';
import { useDefaultProps } from '../default-props';
import { Slide } from '../transitions';
import { useAnimatePresence } from '../utils/animate-presence';
import DrawerCloseButton from './DrawerCloseButton';
import {
  useDrawerContentStyle,
} from './styles';
import useDrawer from './useDrawer';

const DrawerContent = forwardRef((inProps, ref) => {
  const {
    TransitionComponent, // deprecated
    TransitionProps, // deprecated
    slots = {},
    slotProps = {},
    children,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'DrawerContent' });

  { // deprecation warning
    const prefix = `${DrawerContent.displayName}:`;
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

  const [, safeToRemove] = useAnimatePresence();
  const drawerContext = useDrawer(); // context might be an undefined value
  const {
    closeOnEsc,
    closeOnInteractOutside,
    isClosable,
    isOpen,
    onClose,
    onInteractOutside,
    placement,
    size,
    contentRef, // internal use only
  } = { ...drawerContext };
  const combinedRef = useMergeRefs(contentRef, ref);
  const tabIndex = -1;
  const styleProps = useDrawerContentStyle({ placement, size, tabIndex });
  const transitionDirection = {
    'left': 'right',
    'right': 'left',
    'top': 'down',
    'bottom': 'up',
  }[placement];

  const [TransitionSlot, transitionSlotProps] = useSlot({
    name: 'transition',
    ownerDisplayName: DrawerContent.displayName,
    props: {
      ref: combinedRef,
      appear: !!drawerContext,
      'aria-modal': ariaAttr(true),
      role: 'dialog',
      tabIndex,
      direction: transitionDirection,
    },
    slot: slots.transition ?? TransitionComponent ?? Slide,
    slotProps: { ...TransitionProps, ...slotProps.transition },
  });

  useClickOutside(contentRef, (event) => {
    onInteractOutside?.(event);

    const shouldClose = Boolean(closeOnInteractOutside);
    if (shouldClose && !event.defaultPrevented) {
      // Close the drawer when clicking outside the content
      onClose?.(event);
    }
  }, { events: ['click'] });

  return (
    <TransitionSlot
      {...transitionSlotProps}
      {...styleProps}
      {...rest}
      in={drawerContext ? isOpen : true}
      onExited={callAll(safeToRemove, transitionSlotProps.onExited)}
      // Event handlers
      onClick={callEventHandlers(transitionSlotProps.onClick, (event) => event.stopPropagation())}
      onKeyDown={callEventHandlers(transitionSlotProps.onKeyDown, (event) => {
        if (event.key === 'Escape') {
          event.stopPropagation();

          const shouldClose = Boolean(closeOnEsc);
          if (shouldClose) {
            onClose?.(event);
          }
        }
      })}
    >
      {children}
      {!!isClosable && (
        <DrawerCloseButton />
      )}
    </TransitionSlot>
  );
});

DrawerContent.displayName = 'DrawerContent';

export default DrawerContent;
