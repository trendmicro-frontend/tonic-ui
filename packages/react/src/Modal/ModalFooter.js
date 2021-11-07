import React, { forwardRef } from 'react';
import Box from '../Box';
import {
  useModalFooterStyle,
} from './styles';

const ModalFooter = forwardRef((props, ref) => {
  const styleProps = useModalFooterStyle();

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

ModalFooter.displayName = 'ModalFooter';

export default ModalFooter;
