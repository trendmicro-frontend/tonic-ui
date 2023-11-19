import { Stack, Text, useColorMode } from '@tonic-ui/react';
import React from 'react';

const App = () => {
  const [colorMode] = useColorMode();
  const bg = colorMode === 'dark' ? 'gray:80' : 'gray:20';

  return (
    <Stack direction="column" spacing="4x">
      <Text bg={bg} lineHeight="1" px="2x">
        This is exactly the same height as the font size
      </Text>
      <Text bg={bg} lineHeight="normal" px="2x">
        A normal line height is about 20% larger than the font size
      </Text>
      <Text bg={bg} lineHeight="base" px="2x">
        For accessibility concerns, use a minimum value of 1.5 for <code>line-height</code> for main paragraph content
      </Text>
    </Stack>
  );
};

export default App;
