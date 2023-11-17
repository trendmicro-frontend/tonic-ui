import { Badge, Icon, Stack } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Stack mt="2x" direction="row" spacing="8x" shouldWrapChildren>
    <Badge variant="dot" isInvisible>
      <Icon icon="alert" />
    </Badge>
    <Badge variant="dot">
      <Icon icon="alert" />
    </Badge>
    <Badge variant="dot" width="3x" height="3x">
      <Icon icon="alert" />
    </Badge>
  </Stack>
);

export default App;
