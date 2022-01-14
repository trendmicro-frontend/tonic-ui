import { Box, useColorMode } from '@tonic-ui/react';
import React, { forwardRef } from 'react';

const Code = forwardRef((props, ref) => {
  const [colorMode] = useColorMode();
  const color = {
    light: 'black:secondary',
    dark: 'white:secondary',
  }[colorMode];
  const backgroundColor = {
    light: 'rgba(175, 184, 193, 0.2)',
    dark: 'rgba(99, 110, 123, 0.4)',
  }[colorMode];

  return (
    <Box
      ref={ref}
      as="code"
      backgroundColor={backgroundColor}
      borderRadius={3}
      color={color}
      fontFamily="mono"
      fontSize="90%"
      lineHeight="1"
      px={5}
      py={2}
      {...props}
    />
  );
});

Code.displayName = 'Code';

export default Code;
