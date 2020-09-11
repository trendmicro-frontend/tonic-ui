import React from 'react';
import Box from '../Box';
import ColorModeProvider from '../ColorModeProvider';

const DarkMode = (props) => (
  <ColorModeProvider value="dark">
    <Box {...props} />
  </ColorModeProvider>
);

DarkMode.displayName = 'DarkMode';

export default DarkMode;
