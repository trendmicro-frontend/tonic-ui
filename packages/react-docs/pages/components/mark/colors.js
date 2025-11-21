import { Mark, Stack, Text } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Stack direction="column" spacing="4x">
    <Text>
      Text selection: <Mark backgroundColor="blue:60" color="white:primary">mark text</Mark>
    </Text>
    <Text>
      Gradient background: <Mark backgroundImage="linear-gradient(to right, #ff6b6b, #4ecdc4)" color="white">mark text</Mark>
    </Text>
    <Text>
      Default mark text color: <Mark backgroundColor="mark" color="marktext">mark text</Mark>
    </Text>
  </Stack>
);

export default App;
