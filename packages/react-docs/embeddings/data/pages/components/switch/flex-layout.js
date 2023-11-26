import { Box, Flex, Switch, Text } from '@tonic-ui/react';
import React from 'react';

const App = () => {
  return (
    <Flex alignItems="flex-start" columnGap="2x">
      <Switch id="form-control" />
      <Box
        as="label"
        htmlFor="form-control"
        sx={{
          cursor: 'pointer',
          pt: '1x',
          userSelect: 'none',
        }}
      >
        <Text>Label</Text>
        <Text fontSize="xs" lineHeight="xs">Helper text</Text>
      </Box>
    </Flex>
  );
};

export default App;
