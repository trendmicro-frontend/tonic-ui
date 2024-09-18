import React from 'react';
import { Box, useColorMode } from '@tonic-ui/react';

const BorderedBox = (props) => {
  const [colorMode] = useColorMode();
  const styleProps = {
    border: 1,
    borderColor: colorMode === 'light' ? 'rgba(0, 0, 0, .12)' : 'rgba(255, 255, 255, .12)',
  };

  return (
    <Box
      {...styleProps}
      {...props}
    />
  );
};

export default BorderedBox;
