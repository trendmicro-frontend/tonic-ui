import { Box, Stack } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Stack direction="row" spacing="2x">
    <Box
      as="a"
      href=""
      color="blue:40"
      fontWeight="semibold"
      textDecoration="none"
      _hover={{
        textDecoration: 'underline',
      }}
    >
      Normal link
    </Box>
    <Box
      as="a"
      href=""
      color="blue:40"
      fontWeight="semibold"
      textDecoration="none"
      _hover={{
        textDecoration: 'underline',
      }}
      _visited={{
        color: 'purple:60',
      }}
    >
      Visited link
    </Box>
  </Stack>
);

export default App;
