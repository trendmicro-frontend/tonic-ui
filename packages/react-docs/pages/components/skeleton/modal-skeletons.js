import {
  Button,
  Grid,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Skeleton,
  Stack,
} from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <ModalContent width="max(320px, 50%)">
    <ModalHeader>
      Modal Title
    </ModalHeader>
    <ModalBody>
      <Stack direction="column" spacing="10x">
        <Stack direction="column" spacing="4x">
          <Skeleton animation="pulse" width="80%" />
          <Skeleton animation="pulse" />
          <Skeleton animation="pulse" />
        </Stack>
        <Stack direction="column" spacing="4x">
          <Skeleton animation="pulse" width="80%" />
          <Skeleton animation="pulse" />
          <Skeleton animation="pulse" />
        </Stack>
      </Stack>
    </ModalBody>
    <ModalFooter>
      <Grid
        templateColumns="1fr 1fr"
        columnGap="2x"
      >
        <Button disabled>OK</Button>
        <Button disabled>Cancel</Button>
      </Grid>
    </ModalFooter>
  </ModalContent>
);

export default App;
