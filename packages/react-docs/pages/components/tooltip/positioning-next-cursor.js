import { Box, Divider, Flex, Text, TextLabel, Tooltip, useColorStyle } from '@tonic-ui/react';
import React, { useState } from 'react';

const App = () => {
  const [colorStyle] = useColorStyle();
  const [skidding, setSkidding] = useState(0);
  const [distance, setDistance] = useState(16);

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
        label="This is a tooltip"
        nextToCursor
        offset={[skidding, distance]}
      >
        <Flex
          sx={{
            backgroundColor: colorStyle.background.secondary,
            border: 1,
            borderColor: colorStyle.divider,
            width: 100,
            height: 100,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Hover Me
        </Flex>
      </Tooltip>
    </>
  );
};

export default App;
