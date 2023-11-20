/* eslint-disable react/no-unescaped-entities */
import { Box, Flex, useColorMode, useColorStyle } from '@tonic-ui/react';
import React from 'react';

const App = () => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const backgroundColor = colorStyle.background.secondary;
  const color = colorStyle.color.secondary;

  return (
    <Flex flexDirection="row" columnGap="4x">
      <Box height="24x" px="4x" py="3x" backgroundColor={backgroundColor} color={color}>height="24x"</Box>
      <Box height="32x" px="4x" py="3x" backgroundColor={backgroundColor} color={color}>height="32x"</Box>
      <Box height="40x" px="4x" py="3x" backgroundColor={backgroundColor} color={color}>height="40x"</Box>
    </Flex>
  );
};

export default App;
