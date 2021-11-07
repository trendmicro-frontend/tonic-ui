import React, { forwardRef } from 'react';
import Box from '../Box';
import {
  useDrawerHeaderStyle,
} from './styles';

const DrawerHeader = forwardRef((props, ref) => {
  const styleProps = useDrawerHeaderStyle();

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

DrawerHeader.displayName = 'DrawerHeader';

export default DrawerHeader;
