import { Box, Flex, Switch, Text } from '@tonic-ui/react';

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
        <Text color="text.accent">Label</Text>
        <Text mt="1x" color="text.secondary" fontSize="xs" lineHeight="xs">Helper text</Text>
      </Box>
    </Flex>
  );
};

export default App;
