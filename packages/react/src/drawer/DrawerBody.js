import React, { forwardRef } from 'react';
import { Box } from '../box';
import {
  useDrawerBodyStyle,
} from './styles';

const DrawerBody = forwardRef((props, ref) => {
  const styleProps = useDrawerBodyStyle();
  return (
    <Box
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

DrawerBody.displayName = 'DrawerBody';

export default DrawerBody;
