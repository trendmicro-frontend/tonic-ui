import { Box, useColorMode, useColorStyle } from '@tonic-ui/react';
import React from 'react';

const App = () => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const borderColor = {
    dark: 'gray:60',
    light: 'gray:30',
  }[colorMode];

  return (
    <Box
      border={1}
      borderColor={borderColor}
      borderRadius="circle"
      backgroundColor={colorStyle.background.secondary}
      color={colorStyle.color.secondary}
      width="18x"
      height="18x"
    />
  );
};

export default App;
