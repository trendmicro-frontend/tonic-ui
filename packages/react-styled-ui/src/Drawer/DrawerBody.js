import React, { forwardRef } from 'react';
import PseudoBox from '../PseudoBox';
import {
  useDrawerBodyStyle,
} from './styles';

const DrawerBody = forwardRef((props, ref) => {
  const styleProps = useDrawerBodyStyle();
  return (
    <PseudoBox
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

DrawerBody.displayName = 'DrawerBody';

export default DrawerBody;
