import React, { forwardRef } from 'react';
import PseudoBox from '../PseudoBox';
import {
  useDrawerFooterStyle,
} from './styles';

const DrawerFooter = forwardRef((props, ref) => {
  const styleProps = useDrawerFooterStyle();
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
