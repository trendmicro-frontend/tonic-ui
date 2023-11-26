import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@tonic-ui/react';
import { useToggle } from '@tonic-ui/react-hooks';
import React from 'react';

const App = () => {
  const [isOpen, toggleModal] = useToggle(false);
  const [isNestedOpen, toggleNestedModal] = useToggle(false);

  return (
    <>
      <Button onClick={() => toggleModal(true)}>Launch modal</Button>
      <Modal
        closeOnEsc
        closeOnOutsideClick
        isClosable
        isOpen={isOpen}
        onClose={() => toggleModal(false)}
        size="sm"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Modal
          </ModalHeader>
          <ModalBody>
            Modal body text goes here.
          </ModalBody>
          <ModalFooter justifyContent="space-between">
            <Button
              disabled={isNestedOpen}
              variant="primary"
              onClick={() => toggleNestedModal(true)}
            >
              Launch nested modal
            </Button>
            <Box>
              <Button onClick={() => toggleModal(false)} minWidth="20x">
                Close
              </Button>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        closeOnEsc
        closeOnOutsideClick
        isClosable
        isOpen={isNestedOpen}
        onClose={() => toggleNestedModal(false)}
        size="xs"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Nested Modal
          </ModalHeader>
          <ModalBody>
            Modal body text goes here.
          </ModalBody>
          <ModalFooter columnGap="2x">
            <Button variant="primary" onClick={() => toggleNestedModal(false)} minWidth="20x">
              Yes
            </Button>
            <Button onClick={() => toggleNestedModal(false)} minWidth="20x">
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default App;
