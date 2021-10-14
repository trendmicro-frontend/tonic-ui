import React, { forwardRef } from 'react';
import PseudoBox from '../PseudoBox';
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
    <PseudoBox
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

DrawerFooter.displayName = 'DrawerFooter';

export default DrawerFooter;
