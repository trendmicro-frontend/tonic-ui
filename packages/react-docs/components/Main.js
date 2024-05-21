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
      {...props}
    >
      {children}
    </Box>
  );
});

Main.displayName = 'Main';

export default Main;
