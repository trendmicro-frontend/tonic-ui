import {
  Alert,
  Button,
  Collapse,
  Grid,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Skeleton,
  Stack,
  Text,
  usePortalManager,
} from '@tonic-ui/react';
import { useToggle } from '@tonic-ui/react-hooks';
import React, { forwardRef } from 'react';

const App = () => {
  const portal = usePortalManager();
  const openModal = () => {
    portal((close) => (
      <ModalExample onClose={close} />
    ));
  };

  return (
    <>
      <Button variant="secondary" onClick={openModal}>
        Open Modal
      </Button>
    </>
  );
};

const ModalExample = forwardRef((
  {
    onClose,
    ...rest
  },
  ref,
) => {
  const [isAlertOpen, toggleIsAlertOpen] = useToggle(true);

  return (
    <Modal
      ref={ref}
      closeOnEsc
      closeOnOutsideClick
      isClosable
      isOpen={true}
      onClose={onClose}
      size="md"
      {...rest}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Modal
        </ModalHeader>
        <ModalBody>
          <Collapse in={isAlertOpen}>
            <Alert
              isClosable
              onClose={() => toggleIsAlertOpen(false)}
              severity="warning"
              variant="outline"
              mb="4x"
            >
              <Text display="inline-block" fontWeight="semibold" mr="2x">Important:</Text>
              <Text display="inline-block" mr="2x">This is an important message.</Text>
              <Link>Learn more</Link>
            </Alert>
          </Collapse>
          <Stack direction="column" spacing="4x">
            <Skeleton width={160} />
            <Skeleton width={240} />
            <Skeleton width={240} />
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Grid templateColumns="repeat(2, 1fr)" columnGap="2x">
            <Button variant="primary" onClick={onClose}>
              OK
            </Button>
            <Button onClick={onClose}>
              Cancel
            </Button>
          </Grid>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});

ModalExample.displayName = 'ModalExample';

export default App;
