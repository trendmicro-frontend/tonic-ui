import { Box, useColorMode } from '@tonic-ui/react';
import React, { forwardRef } from 'react';

const Code = forwardRef((props, ref) => {
  const [colorMode] = useColorMode();
  const backgroundColor = {
    light: 'gray:10', // FIXME
    dark: 'gray:70',
  }[colorMode];

  return (
    <Box
      ref={ref}
      as="code"
      display="inline-block"
      fontFamily="mono"
      fontSize="sm"
      lineHeight="sm"
      px="2x"
      borderRadius="sm"
      backgroundColor={backgroundColor}
      {...props}
    />
  );
});

Code.displayName = 'Code';

export default Code;
