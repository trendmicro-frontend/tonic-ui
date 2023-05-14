import React, { forwardRef } from 'react';
import { Box } from '../box';
import ColorModeProvider from './ColorModeProvider';

const DarkMode = forwardRef((props, ref) => (
  <ColorModeProvider value="dark">
    <Box
      ref={ref}
      colorScheme="dark"
      {...props}
    />
  </ColorModeProvider>
));

DarkMode.displayName = 'DarkMode';

export default DarkMode;
