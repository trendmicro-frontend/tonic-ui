import chainedFunction from 'chained-function';
import React, { forwardRef, useEffect } from 'react';
import { isValidElementType } from 'react-is';
import { Box } from '../box';
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
  const containerProps = {
    ref: combinedRef,
    onClick: (event) => {
      event.stopPropagation();
      if (closeOnOutsideClick) {
        (typeof onClose === 'function') && onClose(event);
      }
    },
    ...styleProps,
    ...rest,
  };

  /**
   * Check whether modal transition is disabled
   */
  const isTransitionDisabled = !isValidElementType(TransitionComponent);

  useEffect(() => {
    const shouldManuallyRemove = isTransitionDisabled && (isOpen === false) && (typeof safeToRemove === 'function');
    if (shouldManuallyRemove) {
      safeToRemove();
    }
  }, [isTransitionDisabled, isOpen, safeToRemove]);

  if (isTransitionDisabled) {
    return (
      <Box {...containerProps} />
    );
  }

  return (
    <TransitionComponent
      appear={true}
      {...TransitionProps}
      in={isOpen}
      onExited={chainedFunction(safeToRemove, TransitionProps?.onExited)}
      {...containerProps}
    />
  );
});

ModalContainer.displayName = 'ModalContainer';

export default ModalContainer;
