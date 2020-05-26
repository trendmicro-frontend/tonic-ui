import React, { forwardRef } from 'react';
import { useDrawer } from './context';
import ModalOverlay from '../Modal/ModalOverlay';

const DrawerOverlay = forwardRef((props, ref) => {
  const { styles } = useDrawer();
  return <ModalOverlay ref={ref} opacity={styles.opacity} {...props} />;
});

DrawerOverlay.displayName = 'DrawerOverlay';

export default DrawerOverlay;
