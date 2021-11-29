import React, { forwardRef } from 'react';
import Box from '../Box';

const VerticalThumb = forwardRef((props, ref) => (
  <Box ref={ref} {...props} />
));

VerticalThumb.displayName = 'VerticalThumb';

export default VerticalThumb;
