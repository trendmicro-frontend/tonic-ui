import { Box, Flex } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Flex flexDirection="column" rowGap="3x">
    <Box fontSize="xs" lineHeight="xs">Font Size 12px</Box>
    <Box fontSize="sm" lineHeight="sm">Font Size 14px</Box>
    <Box fontSize="md" lineHeight="md">Font Size 16px</Box>
    <Box fontSize="lg" lineHeight="lg">Font Size 18px</Box>
    <Box fontSize="xl" lineHeight="xl">Font Size 20px</Box>
    <Box fontSize="2xl" lineHeight="2xl">Font Size 24px</Box>
    <Box fontSize="3xl" lineHeight="3xl">Font Size 28px</Box>
    <Box fontSize="4xl" lineHeight="4xl">Font Size 32px</Box>
  </Flex>
);

export default App;
