import { Box, Divider, Text, Tooltip, useColorMode } from '@tonic-ui/react';
import React from 'react';

const App = () => {
  const [colorMode] = useColorMode();
  const backgroundColor = {
    dark: 'gray:80',
    light: 'white',
  }[colorMode];
  const color = {
    dark: 'white:primary',
    light: 'black:primary',
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
