import React from 'react';
import Box from '../Box';
import ColorModeProvider from '../ColorModeProvider';

const DarkMode = (props) => (
  <ColorModeProvider value="dark">
    <Box {...props} />
  </ColorModeProvider>
);

export default DarkMode;
