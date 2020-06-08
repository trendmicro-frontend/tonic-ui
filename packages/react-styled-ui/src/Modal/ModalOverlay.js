import React, { forwardRef } from 'react';
import Box from '../Box';
import useColorMode from '../useColorMode';

const ModalOverlay = forwardRef((props, ref) => {
  const { colorMode } = useColorMode();
  const backgroundColor = {
    dark: 'rgba(0, 0, 0, .7)', // TBD
    light: 'rgba(0, 0, 0, .7)', // TBD: light mode is not defined yet
  }[colorMode];

  return (
    <Box
      ref={ref}
      position="fixed"
      left={0}
      top={0}
      width="100vw"
      height="100vh"
      backgroundColor={backgroundColor}
      zIndex="modal"
      {...props}
    />
  );
});

ModalOverlay.displayName = 'ModalOverlay';

export default ModalOverlay;
