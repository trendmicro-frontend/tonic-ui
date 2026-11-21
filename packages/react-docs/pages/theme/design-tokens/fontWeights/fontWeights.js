import { Box, Flex } from '@tonic-ui/react';

const App = () => (
  <Flex flexDirection="column" rowGap="3x">
    <Box fontWeight="thin">thin (100)</Box>
    <Box fontWeight="extralight">extralight (200)</Box>
    <Box fontWeight="light">light (300)</Box>
    <Box fontWeight="normal">normal (400)</Box>
    <Box fontWeight="medium">medium (500)</Box>
    <Box fontWeight="semibold">semibold (600)</Box>
    <Box fontWeight="bold">bold (700)</Box>
    <Box fontWeight="extrabold">extrabold (800)</Box>
    <Box fontWeight="black">black (900)</Box>
  </Flex>
);

export default App;
