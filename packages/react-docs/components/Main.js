import { Box, useColorMode } from '@tonic-ui/react';
import React, { forwardRef } from 'react';

const Main = forwardRef(({ children, ...props }, ref) => {
  const [colorMode] = useColorMode();
  const backgroundColor = {
    light: 'white',
    dark: 'gray:100',
  }[colorMode];

  return (
    <Box
      as="main"
      id="main"
      ref={ref}
      backgroundColor={backgroundColor}
      px="4x"
      py="3x"
      {...props}
    >
      {children}
    </Box>
  );
});

Main.displayName = 'Main';

export default Main;
