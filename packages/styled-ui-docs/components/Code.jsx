import { Box, useColorMode } from '@trendmicro/react-styled-ui';
import React, { forwardRef } from 'react';

const Code = forwardRef((props, ref) => {
  const { colorMode } = useColorMode();
  const backgroundColor = {
    light: 'gray:10', // FIXME
    dark: 'gray:80', // FIXME
  }[colorMode];

  return (
    <Box
      ref={ref}
      as="code"
      display="inline-block"
      fontFamily="mono"
      fontSize="sm"
      px="1x"
      borderRadius="sm"
      backgroundColor={backgroundColor}
      {...props}
    />
  );
});

Code.displayName = 'Code';

export default Code;
