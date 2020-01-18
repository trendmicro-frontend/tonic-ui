import React, { forwardRef } from 'react';
import Box from '../Box';

const Flex = forwardRef((props, ref) => (
  <Box
    ref={ref}
    display="flex"
    {...props}
  />
));

Flex.displayName = 'Flex';

export default Flex;
