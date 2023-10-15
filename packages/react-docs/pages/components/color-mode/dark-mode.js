import {
  Box,
  DarkMode,
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
        The color mode is set to {colorMode}
      </Text>
    </Box>
  );
};

const App = () => (
  <DarkMode>
    <Component />
  </DarkMode>
);

export default App;
