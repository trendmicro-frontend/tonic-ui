import React, { forwardRef } from 'react';
import { useModal } from './context';
import Box from '../Box';

const ModalBody = forwardRef((props, ref) => {
  const { bodyId } = useModal();
  return (
    <Box
      ref={ref}
      id={bodyId}
      p="6x"
      pt={0}
      flex="1"
      h="auto"
      overflowY="auto"
      fontSize="sm"
      lineHeight="sm"
      {...props}
    />
  );
});

ModalBody.displayName = 'ModalBody';

export default ModalBody;
