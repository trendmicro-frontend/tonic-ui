import React, { forwardRef } from 'react';
import { Box } from '../box';

const Image = forwardRef((props, ref) => (
  <Box
    ref={ref}
    as="img"
    alt=""
    {...props}
  />
));

Image.displayName = 'Image';

export default Image;
