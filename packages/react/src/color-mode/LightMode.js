import React, { forwardRef } from 'react';
import { Box } from '../box';
import ColorModeProvider from './ColorModeProvider';

const LightMode = forwardRef((props, ref) => (
  <ColorModeProvider value="light">
    <Box
      ref={ref}
      colorScheme="light"
      {...props}
    />
  </ColorModeProvider>
));

LightMode.displayName = 'LightMode';

export default LightMode;
