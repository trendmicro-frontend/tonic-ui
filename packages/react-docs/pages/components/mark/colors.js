import { Mark, Stack, Text } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Stack direction="column" spacing="4x">
    <Text>
      Custom colors with padding: <Mark backgroundColor="red:50" color="white" px="2x" py="1h">mark text</Mark>
    </Text>
    <Text>
      Gradient background: <Mark backgroundImage="linear-gradient(to right, #ff6b6b, #4ecdc4)" color="white">mark text</Mark>
    </Text>
    <Text>
      Default user agent stylesheet: <Mark backgroundColor="mark" color="marktext">mark text</Mark>
    </Text>
  </Stack>
);

export default App;
