import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import {
  useDrawerHeaderStyle,
} from './styles';
import useDrawer from './useDrawer';

const DrawerHeader = forwardRef((inProps, ref) => {
  const props = useDefaultProps({ props: inProps, name: 'DrawerHeader' });
  const drawerContext = useDrawer(); // context might be an undefined value
  const {
    isClosable,
  } = { ...drawerContext };
  const styleProps = useDrawerHeaderStyle({ isClosable });

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
