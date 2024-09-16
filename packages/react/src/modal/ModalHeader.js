import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import {
  useModalHeaderStyle,
} from './styles';
import useModal from './useModal';

const ModalHeader = forwardRef((inProps, ref) => {
  const props = useDefaultProps({ props: inProps, name: 'ModalHeader' });
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
