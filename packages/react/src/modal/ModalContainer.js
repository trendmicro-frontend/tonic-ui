import React, { forwardRef } from 'react';
import { Box } from '../box';
import useMergeRefs from '../utils/useMergeRefs';
import {
  useModalContainerStyle,
} from './styles';
import useModal from './useModal';

const ModalContainer = forwardRef((props, ref) => {
  const modalContext = useModal(); // context might be an undefined value
  const {
    closeOnOutsideClick,
    onClose,
    containerRef, // internal use only
  } = { ...modalContext };
  const combinedRef = useMergeRefs(containerRef, ref);
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
    ...props,
  };

  return (
    <Box {...containerProps} />
  );
});

ModalContainer.displayName = 'ModalContainer';

export default ModalContainer;
