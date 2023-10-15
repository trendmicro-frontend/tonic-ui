import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  usePortalManager,
} from '@tonic-ui/react';
import React, { forwardRef, useCallback } from 'react';

const MyModal = forwardRef((
  {
    onClose,
    ...rest
  },
  ref,
) => (
  <Modal
    closeOnEsc
    closeOnOutsideClick
    isOpen
    onClose={onClose}
    size="sm"
    {...rest}
  >
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>
        Modal Header
      </ModalHeader>
      <ModalBody>
        Modal Body
      </ModalBody>
      <ModalFooter>
        <Button onClick={onClose}>Close</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
));

MyModal.displayName = 'MyModal';

const App = () => {
  const portal = usePortalManager();
  const openModal = useCallback(() => {
    portal((close) => (
      <MyModal onClose={close} />
    ));
  }, [portal]);

  return (
    <Button onClick={openModal}>
      Open Modal
    </Button>
  );
};

export default App;
