import {
  Box,
  InvertedMode,
  Text,
  useColorMode,
  useColorStyle,
} from '@tonic-ui/react';
import React from 'react';

const Component = () => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });

  return (
    <Box
      backgroundColor={colorStyle.background.secondary}
      color={colorStyle.color.primary}
    >
      <Text px="4x" py="3x">
        The current color mode is inverted to {colorMode} mode
      </Text>
    </Box>
  );
};

const App = () => (
  <InvertedMode>
    <Component />
  </InvertedMode>
);

export default App;
