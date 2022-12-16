import {
  Box,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
} from '@tonic-ui/react';
import React, { forwardRef } from 'react';
import InstantSearchInput from './InstantSearchInput';
import InstantSearchRefinementList from './InstantSearchRefinementList';

const InstantSearchModal = forwardRef((
  {
    onClose,
    ...rest
  },
  ref,
) => {
  return (
    <Modal
      ref={ref}
      autoFocus
      ensureFocus
      closeOnEsc
      closeOnOutsideClick
      isOpen
      onClose={onClose}
      size="md"
      {...rest}
    >
      <ModalOverlay />
      <ModalContent>
        <Box p="4x">
          <InstantSearchInput size="lg" />
        </Box>
        <Divider />
        <InstantSearchRefinementList onClose={onClose} />
      </ModalContent>
    </Modal>
  );
});

InstantSearchModal.displayName = 'InstantSearchModal';

export default InstantSearchModal;
