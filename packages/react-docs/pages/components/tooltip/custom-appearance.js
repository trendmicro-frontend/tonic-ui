import { Box, Divider, Text, Tooltip, useColorMode } from '@tonic-ui/react';
import React from 'react';

const App = () => {
  const [colorMode] = useColorMode();
  const backgroundColor = {
    dark: 'blue:60',
    light: 'blue:60',
  }[colorMode];
  const color = {
    dark: 'white:emphasis',
    light: 'white:emphasis',
  }[colorMode];

  return (
    <>
      <Tooltip
        label="This is a tooltip"
        backgroundColor={backgroundColor}
        color={color}
      >
        <Text display="inline-block">Hover Me</Text>
      </Tooltip>
      <Divider my="4x" />
      <Tooltip
        arrow={false}
        label={(
          <Box py="1x">
            <Text>Title</Text>
            <Divider my="2x" />
            <Text>Content</Text>
          </Box>
        )}
        backgroundColor={backgroundColor}
        color={color}
      >
        <Text display="inline-block">Hover Me</Text>
      </Tooltip>
    </>
  );
};

export default App;
