import { Box, Flex, useColorMode, useColorStyle } from '@tonic-ui/react';
import React from 'react';

const App = () => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const backgroundColor = colorStyle.background.secondary;

  return (
    <Flex flexDirection="column" rowGap="4x">
      <Flex columnGap="1x">
        <Box display="inline-block" width="18x" height="18x" backgroundColor={backgroundColor} />
        <Box display="inline-block" width="18x" height="18x" backgroundColor={backgroundColor} />
      </Flex>
      <Flex columnGap="2x">
        <Box display="inline-block" width="18x" height="18x" backgroundColor={backgroundColor} />
        <Box display="inline-block" width="18x" height="18x" backgroundColor={backgroundColor} />
      </Flex>
      <Flex columnGap="4x">
        <Box display="inline-block" width="18x" height="18x" backgroundColor={backgroundColor} />
        <Box display="inline-block" width="18x" height="18x" backgroundColor={backgroundColor} />
      </Flex>
    </Flex>
  );
};

export default App;
