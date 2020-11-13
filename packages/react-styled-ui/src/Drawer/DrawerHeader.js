import React, { forwardRef } from 'react';
import PseudoBox from '../PseudoBox';
import {
  useDrawerHeaderStyle,
} from './styles';

const DrawerHeader = forwardRef((props, ref) => {
  const styleProps = useDrawerHeaderStyle();

  return (
    <PseudoBox
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

DrawerHeader.displayName = 'DrawerHeader';

export default DrawerHeader;
