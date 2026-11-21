import { Box, Flex } from '@tonic-ui/react';

const App = () => (
  <Flex flexDirection="column" rowGap="3x">
    <Box fontSize="xs" lineHeight="xs">xs (12px)</Box>
    <Box fontSize="sm" lineHeight="sm">sm (14px)</Box>
    <Box fontSize="md" lineHeight="md">md (16px)</Box>
    <Box fontSize="lg" lineHeight="lg">lg (18px)</Box>
    <Box fontSize="xl" lineHeight="xl">xl (20px)</Box>
    <Box fontSize="2xl" lineHeight="2xl">2xl (24px)</Box>
    <Box fontSize="3xl" lineHeight="3xl">3xl (28px)</Box>
    <Box fontSize="4xl" lineHeight="4xl">4xl (32px)</Box>
  </Flex>
);

export default App;
