import { Alert, Box, Stack, Text } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Stack direction="column" spacing="4x">
    <Alert isClosable severity="success">
      <Box mb="1x">
        <Text fontWeight="bold">Success</Text>
      </Box>
      <Text mr={-36}>
        This is a success alert.
      </Text>
    </Alert>
    <Alert isClosable severity="info">
      <Box mb="1x">
        <Text fontWeight="bold">Info</Text>
      </Box>
      <Text mr={-36}>
        This is an info alert.
      </Text>
    </Alert>
    <Alert isClosable severity="warning">
      <Box mb="1x">
        <Text fontWeight="bold">Warning</Text>
      </Box>
      <Text mr={-36}>
        This is a warning alert.
      </Text>
    </Alert>
    <Alert isClosable severity="error">
      <Box mb="1x">
        <Text fontWeight="bold">Error</Text>
      </Box>
      <Text mr={-36}>
        This is an error alert.
      </Text>
    </Alert>
  </Stack>
);

export default App;
