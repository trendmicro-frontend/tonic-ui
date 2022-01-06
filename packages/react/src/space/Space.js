import React, { forwardRef } from 'react';
import { Box } from '../box';

const Space = forwardRef((props, ref) => (
  <Box
    ref={ref}
    display="inline-flex"
    {...props}
  />
));

Space.displayName = 'Space';

export default Space;
