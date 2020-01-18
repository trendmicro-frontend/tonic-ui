import React, { forwardRef } from 'react';
import Box from '../Box';

const Heading = forwardRef((props, ref) => (
  <Box
    ref={ref}
    fontFamily="heading"
    {...props}
  />
));

Heading.displayName = 'Heading';

export default Heading;
