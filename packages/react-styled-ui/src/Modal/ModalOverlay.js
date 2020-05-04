import React, { forwardRef } from 'react';
import wrapEvent from '../utils/wrapEvent';
import Box from '../Box';

const ModalOverlay = forwardRef((props, ref) => {
  return (
    <Box
      position="fixed"
      bg="rgba(0, 0, 0, 0.7)"
      left="0"
      top="0"
      w="100vw"
      h="100vh"
      ref={ref}
      zIndex="overlay"
      onClick={wrapEvent(props.onClick, event => {
        event.stopPropagation();
      })}
      {...props}
    />
  );
});

ModalOverlay.displayName = 'ModalOverlay';

export default ModalOverlay;
