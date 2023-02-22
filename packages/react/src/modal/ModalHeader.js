import React, { forwardRef } from 'react';
import { Box } from '../box';
import {
  useModalHeaderStyle,
} from './styles';
import useModal from './useModal';

const ModalHeader = forwardRef((props, ref) => {
  const modalContext = useModal(); // context might be an undefined value
  const {
    isClosable,
  } = { ...modalContext };
  const styleProps = useModalHeaderStyle({ isClosable });

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

ModalHeader.displayName = 'ModalHeader';

export default ModalHeader;
