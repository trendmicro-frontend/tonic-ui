import React, { forwardRef } from 'react';
import Box from '../Box';
import {
  useModalHeaderStyle,
} from './styles';

const ModalHeader = forwardRef((props, ref) => {
  const styleProps = useModalHeaderStyle();

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
