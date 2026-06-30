import { Box, Flex, Truncate } from '@tonic-ui/react';

const App = () => {
  return (
    <Flex direction="column" rowGap="3x">
      <Box
        px="3x"
        py="2x"
      >
        <Truncate
          title="This is a very long text that will be truncated"
          width={240}
          _hover={{
            width: 'max-content',
          }}
        >
          This is a very long text that will be truncated
        </Truncate>
      </Box>
      <Box
        px="3x"
        py="2x"
        width={240}
      >
        <Truncate
          title="This is a very long text that will be truncated"
          _hover={{
            overflow: 'visible',
          }}
        >
          This is a very long text that will be truncated
        </Truncate>
      </Box>
    </Flex>
  );
};

export default App;
