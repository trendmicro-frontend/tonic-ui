import React, { forwardRef } from 'react';
import Flex from '../Flex';

const ModalFooter = forwardRef((props, ref) => (
  <Flex
    ref={ref}
    as="footer"
    justify="flex-end"
    px="6x"
    py="3x"
    {...props}
  />
));

ModalFooter.displayName = 'ModalFooter';

export default ModalFooter;
