import React, { forwardRef } from 'react';
import { Box } from '../box';

const VisuallyHidden = forwardRef((props, ref) => {
  return (
    <Box
      ref={ref}
      position="absolute"
      width={1}
      height={1}
      padding={0}
      border={0}
      overflow="hidden"
      clipPath="inset(50%)"
      whiteSpace="nowrap"
      {...props}
    />
  );
});

VisuallyHidden.displayName = 'VisuallyHidden';

export default VisuallyHidden;
