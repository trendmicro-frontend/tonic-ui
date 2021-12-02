import React from 'react';
import Box from '../Box';
import ColorModeProvider from '../ColorModeProvider';

const LightMode = (props) => (
  <ColorModeProvider value="light">
    <Box
      colorScheme="light"
      {...props}
    />
  </ColorModeProvider>
);

LightMode.displayName = 'LightMode';

export default LightMode;
