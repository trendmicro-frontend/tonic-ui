import {
  Box,
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
        <Box bg={colorStyle.background.tertiary} px="3x" py="2x" mb="2x">
          Parent portal - This is transported to the container
          <Portal appendToParentPortal={true}>
            <Box bg={colorStyle.background.tertiary} px="3x" py="2x" mb="2x">
              Child portal - This is attached to its parent portal
            </Box>
          </Portal>
        </Box>
      </Portal>
      <Box ref={ref} bg={colorStyle.background.secondary} px="3x" py="2x">
        I am the container
      </Box>
    </>
  );
};

export default App;
