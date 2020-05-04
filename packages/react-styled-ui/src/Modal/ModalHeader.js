import React, { forwardRef } from 'react';
import { useModal } from './context';
import Box from '../Box';

const ModalHeader = forwardRef((props, ref) => {
  const { headerId } = useModal();
  return (
    <Box
      ref={ref}
      pl="6x"
      py="4x"
      pr="10x"
      id={headerId}
      as="header"
      position="relative"
      fontSize="lg"
      lineHeight="xl"
      whiteSpace="nowrap"
      width="100%"
      overflow="hidden"
      textOverflow="ellipsis"
      {...props}
    />
  );
});

ModalHeader.displayName = 'ModalHeader';

export default ModalHeader;
