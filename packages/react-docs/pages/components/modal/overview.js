import {
  Alert,
  Box,
  Button,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Space,
  Stack,
  Text,
} from '@tonic-ui/react';
import React from 'react';
import SkeletonBlock from '@/components/SkeletonBlock';

const App = () => {
  return (
    <Stack direction="column" spacing="4x">
      <ModalContent width={480}>
        <ModalHeader>
          Modal Title
        </ModalHeader>
        <ModalBody>
          <Alert variant="outline" severity="warning" mb="4x">
            <Text>This is a warning alert</Text>
          </Alert>
          <Text mb="4x">
            Modal body text goes here.
          </Text>
          <SkeletonBlock />
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" minWidth="20x">Save Changes</Button>
          <Space width="2x" />
          <Button minWidth="20x">Cancel</Button>
        </ModalFooter>
      </ModalContent>
      <ModalContent width={480}>
        <ModalBody>
          <Text mb="4x">
            Modal body text goes here.
          </Text>
          <SkeletonBlock />
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" minWidth="20x">Save Changes</Button>
          <Space width="2x" />
          <Button minWidth="20x">Cancel</Button>
        </ModalFooter>
      </ModalContent>
      <ModalContent width={480}>
        <ModalBody>
          <Text mb="4x">
            Modal body text goes here.
          </Text>
          <SkeletonBlock />
        </ModalBody>
      </ModalContent>
      <ModalContent width={480}>
        <Box px="4x" py="4x">
          You can create a custom modal with any sort of content.
        </Box>
      </ModalContent>
    </Stack>
  );
};

export default App;
