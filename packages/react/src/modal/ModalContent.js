import { useMergeRefs } from '@tonic-ui/react-hooks';
import { callAll } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import { Fade } from '../transitions';
import { useAnimatePresence } from '../utils/animate-presence';
import ModalCloseButton from './ModalCloseButton';
import {
  useModalContentStyle,
} from './styles';
import useModal from './useModal';

const ModalContent = forwardRef((
  {
    TransitionComponent = Fade,
    TransitionProps,
    children,
    ...rest
  },
  ref,
) => {
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
  const contentProps = {
    ref: combinedRef,
    role: 'dialog',
    tabIndex,
    onClick: event => event.stopPropagation(),
    onKeyDown: event => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        if (closeOnEsc) {
          (typeof onClose === 'function') && onClose(event);
        }
      }
    },
    ...styleProps,
    ...rest,
  };

  return (
    <TransitionComponent
      appear={!!modalContext}
      {...TransitionProps}
      {...contentProps}
      in={modalContext ? isOpen : true}
      onExited={callAll(safeToRemove, TransitionProps?.onExited)}
    >
      {children}
      {!!isClosable && (
        <ModalCloseButton />
      )}
    </TransitionComponent>
  );
});

ModalContent.displayName = 'ModalContent';

export default ModalContent;
