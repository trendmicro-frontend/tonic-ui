import { Box, Divider, Flex, LinearProgress, Stack, TextLabel } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Stack spacing="4x">
    <TextLabel>Indeterminate</TextLabel>
    <LinearProgress size="md" variant="indeterminate" color="blue:60" width={320} />
    <LinearProgress size="md" variant="indeterminate" color="teal:40" width={320} />
    <Divider />
    <TextLabel>Determinate</TextLabel>
    <Flex alignItems="center" columnGap="3x">
      <LinearProgress size="md" variant="determinate" value={40} color="blue:60" width={320}/>
      <TextLabel>40%</TextLabel>
    </Flex>
    <Flex alignItems="center" columnGap="3x">
      <LinearProgress size="md" variant="determinate" value={60} color="teal:40" width={320} />
      <TextLabel>60%</TextLabel>
    </Flex>
    <Divider />
    <TextLabel>Linear gradient</TextLabel>
    <Flex
      alignItems="center"
      columnGap="2x"
      justifyContent="space-between"
      width={320}
    >
      <Box backgroundColor="blue:60" px="2x" py="1x" color="white:primary">
        blue:60
      </Box>
      <Box backgroundColor="teal:40" px="2x" py="1x" color="black:primary">
        teal:40
      </Box>
    </Flex>
    <Flex alignItems="center" columnGap="3x">
      <LinearProgress
        size="md"
        variant="determinate"
        value={100}
        color={['blue:60', 'teal:40']}
        width={320}
      />
      <TextLabel>100%</TextLabel>
    </Flex>
    <Divider />
    <TextLabel>Linear gradient with wave light</TextLabel>
    <Flex alignItems="center" columnGap="3x">
      <LinearProgress
        size="md"
        variant="determinate"
        value={100}
        color="linear-gradient(90deg, rgba(255, 255, 255, 0) 6.03%, rgba(255, 255, 255, 0.12) 16.32%, rgba(255, 255, 255, 0.12) 42.22%, rgba(255, 255, 255, 0) 60.67%), linear-gradient(90deg, #1E5EDE, #04CAA1)"
        width={320}
      />
      <TextLabel>100%</TextLabel>
    </Flex>
  </Stack>
);

export default App;
