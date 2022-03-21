import chainedFunction from 'chained-function';
import React, { forwardRef } from 'react';
import { Fade } from '../transitions';
import { useAnimatePresence } from '../utils/animate-presence';
import useForkRef from '../utils/useForkRef';
import {
  useModalContainerStyle,
} from './styles';
import useModal from './useModal';

const ModalContainer = forwardRef((
  {
    TransitionComponent = Fade,
    TransitionProps,
    ...rest
  },
  ref,
) => {
  const modalContext = useModal(); // context might be an undefined value
  const {
    closeOnOutsideClick,
    isOpen,
    onClose,
    containerRef, // internal use only
  } = { ...modalContext };
  const combinedRef = useForkRef(containerRef, ref);
  const [, safeToRemove] = useAnimatePresence();
  const styleProps = useModalContainerStyle();

  return (
    <TransitionComponent
      appear={true}
      {...TransitionProps}
      in={isOpen}
      onExited={chainedFunction(safeToRemove, TransitionProps?.onExited)}
      ref={combinedRef}
      onClick={event => {
        event.stopPropagation();
        if (closeOnOutsideClick) {
          (typeof onClose === 'function') && onClose(event);
        }
      }}
      {...styleProps}
      {...rest}
    />
  );
});

ModalContainer.displayName = 'ModalContainer';

export default ModalContainer;
