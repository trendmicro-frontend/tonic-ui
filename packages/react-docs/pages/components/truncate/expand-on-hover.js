import { Box, Flex, Truncate, useColorMode, useColorStyle } from '@tonic-ui/react';
import React from 'react';

const App = () => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });

  return (
    <Flex direction="column" rowGap="3x">
      <Box
        backgroundColor={colorStyle.background.secondary}
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
        backgroundColor={colorStyle.background.secondary}
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
