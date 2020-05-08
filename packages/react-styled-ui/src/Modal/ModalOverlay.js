import React, { forwardRef } from 'react';
import wrapEvent from '../utils/wrapEvent';
import Box from '../Box';
import { useModal } from './context';

const ModalOverlay = forwardRef((props, ref) => {
  const { disableOverlay } = useModal();
  const _opacity = disableOverlay ? 0 : 0.7;
  const _bg = `rgba(0, 0, 0, ${_opacity})`;

  return (
    <Box
      position="fixed"
      bg={_bg}
      left="0"
      top="0"
      w="100vw"
      h="100vh"
      ref={ref}
      zIndex="modal"
      onClick={wrapEvent(props.onClick, event => {
        event.stopPropagation();
      })}
      {...props}
    />
  );
});

ModalOverlay.displayName = 'ModalOverlay';

export default ModalOverlay;
