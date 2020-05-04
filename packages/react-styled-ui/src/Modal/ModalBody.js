import React, { forwardRef } from 'react';
import { useModal } from './context';
import Box from '../Box';

const ModalBody = forwardRef((props, ref) => {
  const { bodyId } = useModal();
  return (
    <Box
      ref={ref}
      id={bodyId}
      pl="4x"
      pr="10x"
      flex="1"
      h="calc(100% - 116px)"
      overflowY="auto"
      fontSize="sm"
      {...props}
    />
  );
});

ModalBody.displayName = 'ModalBody';

export default ModalBody;
