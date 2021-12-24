import React from 'react';
import Box from '../Box';
import { ColorModeProvider } from '../ColorMode';

const DarkMode = (props) => (
  <ColorModeProvider value="dark">
    <Box
      colorScheme="dark"
      {...props}
    />
  </ColorModeProvider>
);

DarkMode.displayName = 'DarkMode';

export default DarkMode;
