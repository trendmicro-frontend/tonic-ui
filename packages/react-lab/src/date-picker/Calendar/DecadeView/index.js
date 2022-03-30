import { Box } from '@tonic-ui/react';
import React, { forwardRef } from 'react';
import Years from './Years';

const DecadeView = forwardRef((
  props,
  ref
) => {
  return (
    <Box
      ref={ref}
      flex="auto"
      {...props}
    >
      <Years />
    </Box>
  );
});

DecadeView.displayName = 'DecadeView';

export default DecadeView;
