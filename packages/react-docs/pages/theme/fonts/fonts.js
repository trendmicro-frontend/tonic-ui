import { Box, Code, Flex } from '@tonic-ui/react';

const App = () => (
  <Flex flexDirection="column" rowGap="3x">
    <Box fontFamily="base">
      This text uses the <Code>base</Code> token as the default font family.
    </Box>
    <Box fontFamily="mono">
      This text uses the <Code>mono</Code> token for monospace text.
    </Box>
  </Flex>
);

export default App;
