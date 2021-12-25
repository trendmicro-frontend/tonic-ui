import React, { forwardRef } from 'react';
import { Box } from '../box';

const VerticalTrack = forwardRef((props, ref) => (
  <Box ref={ref} {...props} />
));

VerticalTrack.displayName = 'VerticalTrack';

export default VerticalTrack;
