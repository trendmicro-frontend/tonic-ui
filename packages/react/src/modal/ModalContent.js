import { useMergeRefs, useOnceWhen } from '@tonic-ui/react-hooks';
import { ariaAttr, callAll, callEventHandlers, warnDeprecatedProps } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import { useSlot } from '../slot';
import { useDefaultProps } from '../default-props';
import { Fade } from '../transitions';
import { useAnimatePresence } from '../utils/animate-presence';
import ModalCloseButton from './ModalCloseButton';
import {
  useModalContentStyle,
} from './styles';
import useModal from './useModal';

/**
 * @typedef {Object} ModalContentProps
 * @property {React.ReactNode} [children] - The content of the modal.
 * @property {{ closeButton?: object; transition?: object }} [slotProps] - Props forwarded to internal slots. `slotProps.closeButton` / `slotProps.transition` are applied to the close button / transition elements.
 * @property {{ closeButton?: React.ElementType; transition?: React.ElementType }} [slots] - Slot components. `slots.closeButton` replaces the default `ModalCloseButton`; `slots.transition` replaces the default `Fade`.
 * @property {React.ElementType} [TransitionComponent=Fade] - **Deprecated.** Use `slots.transition` instead. The component used for the transition.
 * @property {{ appear?: boolean; timeout?: number | { appear?: number; enter?: number; exit?: number } }} [TransitionProps] - **Deprecated.** Use `slotProps.transition` instead. Props applied to the transition element.
 */

/**
 * @type {ForwardRefComponent<'div', ModalContentProps>}
 */
const ModalContent = forwardRef((inProps, ref) => {
  const {
    TransitionComponent, // deprecated
    TransitionProps, // deprecated
    slots = {},
    slotProps = {},
    children,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'ModalContent' });

  { // deprecation warning
    const prefix = `${ModalContent.displayName}:`;
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
  const modalContext = useModal(); // context might be an undefined value
  const {
    closeOnEsc,
    isClosable,
    isOpen,
    onClose,
    scrollBehavior,
    size,
    contentRef, // internal use only
    placement, // internal use only
  } = { ...modalContext };
  const combinedRef = useMergeRefs(contentRef, ref);
  const tabIndex = -1;
  const styleProps = useModalContentStyle({ placement, scrollBehavior, size, tabIndex });

  const [CloseButtonSlot, closeButtonSlotProps] = useSlot({
    name: 'closeButton',
    ownerName: ModalContent.displayName,
    props: {},
    slot: slots.closeButton ?? ModalCloseButton,
    slotProps: slotProps.closeButton,
  });

  const [TransitionSlot, transitionSlotProps] = useSlot({
    name: 'transition',
    ownerName: ModalContent.displayName,
    props: {
      ref: combinedRef,
      appear: !!modalContext,
      'aria-modal': ariaAttr(true),
      role: 'dialog',
      tabIndex,
    },
    slot: slots.transition ?? TransitionComponent ?? Fade,
    slotProps: { ...TransitionProps, ...slotProps.transition },
  });

  return (
    <TransitionSlot
      {...transitionSlotProps}
      {...styleProps}
      {...rest}
      in={modalContext ? isOpen : true}
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
        <CloseButtonSlot {...closeButtonSlotProps} />
      )}
    </TransitionSlot>
  );
});

ModalContent.displayName = 'ModalContent';

export default ModalContent;
