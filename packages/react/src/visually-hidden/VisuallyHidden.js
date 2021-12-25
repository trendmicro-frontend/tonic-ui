import React, { forwardRef } from 'react';
import { Box } from '../box';

const VisuallyHidden = forwardRef((props, ref) => {
  return (
    <Box
      ref={ref}
      border={0}
      clip="rect(0px, 0px, 0px, 0px)"
      height={1}
      width={1}
      margin={-1}
      padding={0}
      overflow="hidden"
      whiteSspace="nowrap"
      position="absolute"
      {...props}
    />
  );
});

VisuallyHidden.displayName = 'VisuallyHidden';

export default VisuallyHidden;
