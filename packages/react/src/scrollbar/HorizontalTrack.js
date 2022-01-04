import React, { forwardRef } from 'react';
import { Box } from '../box';

const HorizontalTrack = forwardRef((props, ref) => (
  <Box ref={ref} {...props} />
));

HorizontalTrack.displayName = 'HorizontalTrack';

export default HorizontalTrack;
