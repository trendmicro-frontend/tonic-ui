import { useEffectOnce } from '@tonic-ui/react-hooks';
import React, { forwardRef } from 'react';
import Box from './Box';

const PseudoBox = forwardRef((props, ref) => {
  useEffectOnce(() => {
    console.error('Warning: The `PseudoBox` component is deprecated and will be removed in the next major release. Use the `Box` component instead.');
  });

  return (
    <Box ref={ref} {...props} />
  );
});

PseudoBox.displayName = 'PseudoBox';

export default PseudoBox;
