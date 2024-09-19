import { useMergeRefs } from '@tonic-ui/react-hooks';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import {
  useModalContainerStyle,
} from './styles';
import useModal from './useModal';

const ModalContainer = forwardRef((inProps, ref) => {
  const props = useDefaultProps({ props: inProps, name: 'ModalContainer' });
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
