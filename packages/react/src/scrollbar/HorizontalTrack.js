import React, { forwardRef } from 'react';
import { Box } from '../box';

const HorizontalTrack = forwardRef((props, ref) => (
  <Box
    data-scrollbar-track="horizontal"
    ref={ref}
    {...props}
  />
));

HorizontalTrack.displayName = 'HorizontalTrack';

export default HorizontalTrack;
