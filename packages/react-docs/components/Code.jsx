import { Box, useColorMode } from '@tonic-ui/react';
import React, { forwardRef } from 'react';

const Code = forwardRef((props, ref) => {
  const [colorMode] = useColorMode();
  const color = {
    light: 'black:primary',
    dark: 'white:primary',
  }[colorMode];
  const backgroundColor = {
    light: 'gray:20',
    dark: 'gray:70',
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
