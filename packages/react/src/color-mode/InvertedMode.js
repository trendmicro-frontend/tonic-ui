import React, { forwardRef } from 'react';
import { Box } from '../box';
import ColorModeProvider from './ColorModeProvider';
import useColorMode from './useColorMode';

const InvertedMode = forwardRef((props, ref) => {
  const [colorMode] = useColorMode();
  const invertedColorMode = colorMode === 'light' ? 'dark' : 'light';

  return (
    <ColorModeProvider value={invertedColorMode}>
      <Box
        ref={ref}
        colorScheme={invertedColorMode}
        {...props}
      />
    </ColorModeProvider>
  );
});

InvertedMode.displayName = 'InvertedMode';

export default InvertedMode;
