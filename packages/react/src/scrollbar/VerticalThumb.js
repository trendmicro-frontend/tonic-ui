import React, { forwardRef } from 'react';
import { Box } from '../box';

const VerticalThumb = forwardRef((props, ref) => (
  <Box
    data-scrollbar-thumb="vertical"
    ref={ref}
    {...props}
  />
));

VerticalThumb.displayName = 'VerticalThumb';

export default VerticalThumb;
