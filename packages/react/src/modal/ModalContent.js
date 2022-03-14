import React, { forwardRef } from 'react';
import { Box } from '../box';
import { Fade } from '../transitions';
import useForkRef from '../utils/useForkRef';
import ModalCloseButton from './ModalCloseButton';
import ModalContainer from './ModalContainer';
import {
  useModalContentStyle,
} from './styles';
import useModal from './useModal';

const ModalContentBase = forwardRef(({ children, ...rest }, ref) => {
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
      outline={0}
      position="relative"
      width="100%"
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

const ModalContent = React.forwardRef(({
  TransitionComponent = Fade,
  TransitionProps,
  ...rest
}, ref) => {
  const modalContext = useModal(); // context might be an undefined value

  if (!modalContext) {
    return (
      <ModalContentBase ref={ref} {...rest} />
    );
  }

  return (
    <ModalContainer
      TransitionComponent={TransitionComponent}
      TransitionProps={TransitionProps}
    >
      <ModalContentBase ref={ref} {...rest} />
    </ModalContainer>
  );
});

ModalContent.displayName = 'ModalContent';

export default ModalContent;
