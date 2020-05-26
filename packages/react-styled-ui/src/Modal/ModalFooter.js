import React, { forwardRef } from 'react';
import Box from '../Box';

const ModalFooter = forwardRef((props, ref) => (
  <Box
    display="flex"
    justifyContent="flex-end"
    ref={ref}
    px="6x"
    py="3x"
    as="footer"
    {...props}
  />
));

ModalFooter.displayName = 'ModalFooter';

export default ModalFooter;
