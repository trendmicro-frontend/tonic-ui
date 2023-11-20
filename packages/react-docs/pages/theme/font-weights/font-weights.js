import { Box, Flex  } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Flex flexDirection="column" rowGap="3x">
    <Box fontWeight="thin">Thin (100)</Box>
    <Box fontWeight="extraliht">Extra light (200)</Box>
    <Box fontWeight="light">Light (300)</Box>
    <Box fontWeight="normal">Normal (400)</Box>
    <Box fontWeight="medium">Medium (500)</Box>
    <Box fontWeight="semibold">Semibold (600)</Box>
    <Box fontWeight="bold">Bold (700)</Box>
    <Box fontWeight="extrabold">Extra bold (800)</Box>
    <Box fontWeight="black">Black (900)</Box>
  </Flex>
);

export default App;
