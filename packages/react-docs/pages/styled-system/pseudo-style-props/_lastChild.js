import { Box, useColorMode } from '@tonic-ui/react';
import React from 'react';

const App = () => {
  const [colorMode] = useColorMode();
  const borderColor = colorMode === 'dark' ? 'gray:70' : 'gray:20';

  return (
    <Box border={1} borderColor={borderColor} borderRadius="sm">
      {['One', 'Two', 'Three'].map(item => (
        <Box
          key={item}
          py="2x"
          px="3x"
          borderBottom={1}
          borderBottomColor={borderColor}
          _lastChild={{
            borderBottomWidth: 0,
            bg: 'blue:40',
            color: 'white:primary',
          }}
        >
          {item}
        </Box>
      ))}
    </Box>
  );
};

export default App;
