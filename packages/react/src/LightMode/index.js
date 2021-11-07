import React from 'react';
import Box from '../Box';
import ColorModeProvider from '../ColorModeProvider';

const LightMode = (props) => (
  <ColorModeProvider value="light">
    <Box {...props} />
  </ColorModeProvider>
);

LightMode.displayName = 'LightMode';

export default LightMode;
