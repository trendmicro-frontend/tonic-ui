import React, { forwardRef, useEffect } from 'react';
import Box from '../Box';

const PseudoBox = forwardRef((props, ref) => {
  useEffect(() => {
    console.error('Warning: PseudoBox is deprecated and will be removed in a future release. Please use the Box component instead.');
  }, []);

  return (
    <Box ref={ref} {...props} />
  );
});

PseudoBox.displayName = 'PseudoBox';

export default PseudoBox;
