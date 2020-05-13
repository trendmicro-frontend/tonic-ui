import React, { forwardRef } from 'react';
import { useDrawer } from './context';
import ModalContent from '../Modal/ModalContent';

const sizeProps = (size) => {
  return {
    sm: {
      width: 336,
    },
    md: {
      width: 504,
    },
    lg: {
      width: 672,
    },
    full: {
      width: '100vw'
    },
    auto: {
      width: 'auto',
    },
  }[size];
};

const DrawerContent = forwardRef((props, ref) => {
  const {
    // Don't want to  animate the opacity of the DrawerContent
    styles: { ...placementStyles },
    size,
  } = useDrawer();

  const _sizeProps = sizeProps(size);

  return (
    <ModalContent
      ref={ref}
      position="fixed"
      {..._sizeProps}
      maxHeight="100vh"
      {...props}
      style={{ ...props.styles, ...placementStyles }}
    />
  );
});

DrawerContent.displayName = 'DrawerContent';

export default DrawerContent;
