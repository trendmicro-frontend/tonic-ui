import { useMergeRefs, useOnceWhen } from '@tonic-ui/react-hooks';
import { ariaAttr, callAll, callEventHandlers, warnDeprecatedProps } from '@tonic-ui/utils';
import { forwardRef } from 'react';
import { useSlot } from '../slot';
import { useDefaultProps } from '../default-props';
import { Fade } from '../transitions';
import { useAnimatePresence } from '../utils/animate-presence';
import ModalCloseButton from './ModalCloseButton';
import {
  useModalContentStyle,
} from './styles';
import useModal from './useModal';

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
    ownerDisplayName: ModalContent.displayName,
    props: {},
    slot: slots.closeButton ?? ModalCloseButton,
    slotProps: slotProps.closeButton,
  });

  const [TransitionSlot, transitionSlotProps] = useSlot({
    name: 'transition',
    ownerDisplayName: ModalContent.displayName,
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
