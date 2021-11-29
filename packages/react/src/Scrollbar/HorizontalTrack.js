import React, { forwardRef } from 'react';
import Box from '../Box';

const HorizontalTrack = forwardRef((props, ref) => (
  <Box ref={ref} {...props} />
));

HorizontalTrack.displayName = 'HorizontalTrack';

export default HorizontalTrack;
