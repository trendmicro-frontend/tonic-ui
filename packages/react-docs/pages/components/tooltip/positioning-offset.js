import { Box, Divider, Flex, Text, TextLabel, Tooltip } from '@tonic-ui/react';
import React, { useState } from 'react';

const App = () => {
  const [skidding, setSkidding] = useState(0);
  const [distance, setDistance] = useState(8);

  return (
    <>
      <Box mb="4x">
        <Box mb="2x">
          <TextLabel>skidding</TextLabel>
        </Box>
        <Flex columnGap="4x">
          <input
            type="range"
            name="skidding"
            min={-48}
            max={48}
            value={skidding}
            onChange={(e) => setSkidding(Number(e.target.value))}
          />
          <Text>{skidding}</Text>
        </Flex>
      </Box>
      <Box mb="4x">
        <Box mb="2x">
          <TextLabel>distance</TextLabel>
        </Box>
        <Flex columnGap="4x">
          <input
            type="range"
            name="distance"
            min={-48}
            max={48}
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
          />
          <Text>{distance}</Text>
        </Flex>
      </Box>
      <Divider my="4x" />
      <Tooltip
        isOpen
        label="This is a tooltip"
        offset={[skidding, distance]}
      >
        <Text display="inline-block">Text content</Text>
      </Tooltip>
    </>
  );
};

export default App;
