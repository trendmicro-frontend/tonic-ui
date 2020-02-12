import React, { forwardRef } from 'react';
import Box from '../Box';

const Space = forwardRef((props, ref) => (
  <Box
    ref={ref}
    display="inline-block"
    {...props}
  />
));

Space.displayName = 'Space';

export default Space;
