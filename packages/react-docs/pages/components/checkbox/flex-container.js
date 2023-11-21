import { Box, Checkbox, Flex, Text } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Flex alignItems="flex-start" columnGap="2x">
    <Box py="1h">
      <Checkbox id="form-control" />
    </Box>
    <Box
      as="label"
      htmlFor="form-control"
      sx={{
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      <Text>Label</Text>
      <Text fontSize="xs" lineHeight="xs">Helper text</Text>
    </Box>
  </Flex>
);

export default App;
