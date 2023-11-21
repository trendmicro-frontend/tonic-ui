import { Box, Text } from '@tonic-ui/react';
import React from 'react';

const App = () => (
<Box
  sx={{
    '--my-color-dodger-blue': '#1E90FF'
  }}
>
  <Text
    backgroundColor="var(--my-color-dodger-blue)"
    color="white:primary"
  >
    This text has a background of Dodger Blue
  </Text>
</Box>
);

export default App;
