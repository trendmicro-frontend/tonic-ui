import chainedFunction from 'chained-function';
import React, { forwardRef } from 'react';
import { Fade } from '../transitions';
import { useAnimatePresence } from '../utils/animate-presence';
import useMergeRefs from '../utils/useMergeRefs';
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
  const styleProps = useModalContentStyle({ placement, scrollBehavior, size });
  const contentProps = {
    ref: combinedRef,
    role: 'dialog',
    tabIndex: -1,
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
      onExited={chainedFunction(safeToRemove, TransitionProps?.onExited)}
    >
      {children}
      {!!isClosable && (
        <ModalCloseButton onClick={onClose} />
      )}
    </TransitionComponent>
  );
});

ModalContent.displayName = 'ModalContent';

export default ModalContent;
