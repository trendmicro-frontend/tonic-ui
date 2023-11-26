import { Alert, Stack, Text } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Stack direction="column" spacing="4x">
    <Alert
      variant="solid"
      severity="none"
      background="linear-gradient(90deg, var(--tonic-colors-purple-60) 0%, var(--tonic-colors-blue-50) 100%)"
      color="white:emphasis"
    >
      <Text>This is a promotion message</Text>
    </Alert>
    <Alert
      variant="outline"
      severity="none"
      borderImageSource="linear-gradient(90deg, var(--tonic-colors-purple-60) 0%, var(--tonic-colors-blue-50) 100%)"
      borderImageSlice={1}
    >
      <Text>This is a promotion message</Text>
    </Alert>
  </Stack>
);

export default App;
