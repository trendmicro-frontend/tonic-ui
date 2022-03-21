import React, { forwardRef } from 'react';
import { Box } from '../box';
import useForkRef from '../utils/useForkRef';
import ModalCloseButton from './ModalCloseButton';
import {
  useModalContentStyle,
} from './styles';
import useModal from './useModal';

const ModalContent = forwardRef((
  {
    children,
    ...rest
  },
  ref,
) => {
  const modalContext = useModal(); // context might be an undefined value
  const {
    closeOnEsc,
    isClosable,
    onClose,
    scrollBehavior,
    size,
    contentRef, // internal use only
  } = { ...modalContext };
  const combinedRef = useForkRef(contentRef, ref);
  const styleProps = useModalContentStyle({ scrollBehavior, size });

  return (
    <Box
      ref={combinedRef}
      role="dialog"
      tabIndex={-1}
      onClick={event => event.stopPropagation()}
      onKeyDown={event => {
        if (event.key === 'Escape') {
          event.stopPropagation();
          if (closeOnEsc) {
            (typeof onClose === 'function') && onClose(event);
          }
        }
      }}
      {...styleProps}
      {...rest}
    >
      {children}
      {!!isClosable && (
        <ModalCloseButton onClick={onClose} />
      )}
    </Box>
  );
});

ModalContent.displayName = 'ModalContent';

export default ModalContent;
