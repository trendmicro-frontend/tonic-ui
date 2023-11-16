import {
  Icon,
  Stack,
} from '@tonic-ui/react';
import React from 'react';

const App = () => {
  return (
    <Stack direction="row" spacing="4x" alignItems="center">
      <Icon icon="face-smile-o" />
      <Icon icon="face-smile-o" size="6x" color="red:50" />
      <Icon icon="face-smile-o" size="8x" color="yellow:50" />
      <Icon icon="face-smile-o" size="12x" color="teal:40" />
    </Stack>
  );
};

export default App;
