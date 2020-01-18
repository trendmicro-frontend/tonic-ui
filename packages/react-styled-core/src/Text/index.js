import React, { forwardRef } from 'react';
import Box from '../Box';

const Text = forwardRef((props, ref) => (
  <Box
    ref={ref}
    display="inline-block"
    fontFamily="base"
    {...props}
  />
));

Text.displayName = 'Text';

export default Text;
