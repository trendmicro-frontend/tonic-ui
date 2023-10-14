import {
  Box,
  Portal,
  VisuallyHidden,
  useColorMode,
  useColorStyle,
} from '@tonic-ui/react';
import React from 'react';

const App = () => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });

  return (
    <>
      <Portal>
        <VisuallyHidden>
          {/* Open developer tool to inspect elements inside the body tag */}
          <Box bg={colorStyle.background.tertiary} px="3x" py="2x">
            Portal - This is transported to the end of the document body
          </Box>
        </VisuallyHidden>
      </Portal>
      <Box bg={colorStyle.background.secondary} px="3x" py="2x">
        I am the container
      </Box>
    </>
  );
};

export default App;
