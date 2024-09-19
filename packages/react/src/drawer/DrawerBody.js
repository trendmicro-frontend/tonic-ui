import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import {
  useDrawerBodyStyle,
} from './styles';
import useDrawer from './useDrawer';

const DrawerBody = forwardRef((inProps, ref) => {
  const props = useDefaultProps({ props: inProps, name: 'DrawerBody' });
  const drawerContext = useDrawer(); // context might be an undefined value
  const {
    scrollBehavior, // internal use only
  } = { ...drawerContext };
  const styleProps = useDrawerBodyStyle({ scrollBehavior });

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
