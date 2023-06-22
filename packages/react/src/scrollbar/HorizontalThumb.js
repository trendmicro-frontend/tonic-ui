import React, { forwardRef } from 'react';
import { Box } from '../box';

const HorizontalThumb = forwardRef((props, ref) => (
  <Box
    data-scrollbar-thumb="horizontal"
    ref={ref}
    {...props}
  />
));

HorizontalThumb.displayName = 'HorizontalThumb';

export default HorizontalThumb;
