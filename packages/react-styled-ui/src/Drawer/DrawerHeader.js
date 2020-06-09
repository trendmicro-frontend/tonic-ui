import React, { forwardRef } from 'react';
import Box from '../Box';

const DrawerHeader = forwardRef((props, ref) => {
  return (
    <Box
      ref={ref}
      pt="4x"
      pb="3x"
      pl="6x"
      pr="12x"
      position="relative"
      fontSize="xl"
      lineHeight="xl"
      {...props}
    />
  );
});

DrawerHeader.displayName = 'DrawerHeader';

export default DrawerHeader;
