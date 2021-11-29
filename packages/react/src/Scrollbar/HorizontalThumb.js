import React, { forwardRef } from 'react';
import Box from '../Box';

const HorizontalThumb = forwardRef((props, ref) => (
  <Box ref={ref} {...props} />
));

HorizontalThumb.displayName = 'HorizontalThumb';

export default HorizontalThumb;
