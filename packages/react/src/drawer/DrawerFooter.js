import React, { forwardRef } from 'react';
import { Box } from '../box';
import useDrawer from './useDrawer';
import {
  useDrawerFooterStyle,
} from './styles';

const DrawerFooter = forwardRef((props, ref) => {
  const context = useDrawer(); // context might be an undefined value
  const {
    placement,
  } = { ...context };
  const styleProps = useDrawerFooterStyle({ placement });

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

DrawerFooter.displayName = 'DrawerFooter';

export default DrawerFooter;
