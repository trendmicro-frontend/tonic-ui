import React, { forwardRef } from 'react';
import Box from '../Box';

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
