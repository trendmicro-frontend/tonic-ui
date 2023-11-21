/* eslint-disable react/no-unescaped-entities */
import { Box, Flex, useColorMode, useColorStyle } from '@tonic-ui/react';
import React from 'react';

const App = () => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const backgroundColor = colorStyle.background.secondary;
  const color = colorStyle.color.secondary;

  return (
    <Flex flexDirection="column" rowGap="4x">
      <Box width="32x" px="4x" py="3x" backgroundColor={backgroundColor} color={color}>width="32x"</Box>
      <Box width="48x" px="4x" py="3x" backgroundColor={backgroundColor} color={color}>width="48x"</Box>
      <Box width="64x" px="4x" py="3x" backgroundColor={backgroundColor} color={color}>width="64x"</Box>
    </Flex>
  );
};

export default App;
