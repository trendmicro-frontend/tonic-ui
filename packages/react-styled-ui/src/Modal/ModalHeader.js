import React, { forwardRef } from 'react';
import { useModal } from './context';
import Box from '../Box';
import ModalCloseButton from './ModalCloseButton';

const ModalHeader = forwardRef(({ children, hideCloseButton, ...restProps }, ref) => {
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
      fontSize="xl"
      lineHeight="xl"
      whiteSpace="nowrap"
      width="100%"
      overflow="hidden"
      textOverflow="ellipsis"
      {...restProps}
    >
      {children}
      {!hideCloseButton && <ModalCloseButton />}
    </Box>
  );
});

ModalHeader.displayName = 'ModalHeader';

export default ModalHeader;
