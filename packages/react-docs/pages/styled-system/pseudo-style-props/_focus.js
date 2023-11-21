import { Box } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Box
    as="input"
    placeholder="Click Me"
    py="2x"
    px="3x"
    bg="gray:20"
    border={1}
    borderColor="transparent"
    borderRadius="sm"
    outline="none"
    _focus={{
      bg: 'white:primary',
      boxShadow: '0 0 0 .2rem rgba(111, 155, 244, .5)',
    }}
  />
);

export default App;
