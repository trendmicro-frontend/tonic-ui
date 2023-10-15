import {
  Box,
  Flex,
  Portal,
  useColorMode,
  useColorStyle,
} from '@tonic-ui/react';
import React, { useRef } from 'react';

const App = () => {
  const ref = useRef();
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });

  return (
    <>
      <Portal containerRef={ref}>
        <Box bg={colorStyle.background.tertiary} px="3x" py="2x">
          Portal - This is transported to the container
        </Box>
      </Portal>
      <Flex flexDirection="column" rowGap="2x">
        <Box ref={ref} bg={colorStyle.background.secondary} px="3x" py="2x">
          I am the container
        </Box>
      </Flex>
    </>
  );
};

export default App;
