import { Badge, Stack } from '@tonic-ui/react';
import { AlertIcon } from '@tonic-ui/react-icons';
import React from 'react';

const App = () => (
  <Stack mt="2x" direction="row" spacing="8x" shouldWrapChildren>
    <Badge variant="dot" isInvisible>
      <AlertIcon />
    </Badge>
    <Badge variant="dot">
      <AlertIcon />
    </Badge>
    <Badge variant="dot" width="3x" height="3x">
      <AlertIcon />
    </Badge>
  </Stack>
);

export default App;
