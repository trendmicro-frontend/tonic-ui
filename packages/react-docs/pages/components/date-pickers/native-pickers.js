import { Box, Flex, Input, TextLabel } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Flex
    display="inline-flex"
    direction="column"
    rowGap="4x"
  >
    <Box>
      <TextLabel mb="1x">date</TextLabel>
      <Input type="date" />
    </Box>
    <Box>
      <TextLabel mb="1x">time</TextLabel>
      <Input type="time" />
    </Box>
    <Box>
      <TextLabel mb="1x">datetime-local</TextLabel>
      <Input type="datetime-local" />
    </Box>
    <Box>
      <TextLabel mb="1x">month</TextLabel>
      <Input type="month" />
    </Box>
    <Box>
      <TextLabel mb="1x">week</TextLabel>
      <Input type="week" />
    </Box>
  </Flex>
);

export default App;
