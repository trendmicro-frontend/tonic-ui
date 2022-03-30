import { Box } from '@tonic-ui/react';
import React, { forwardRef } from 'react';
import Months from './Months';

const YearView = forwardRef((
  props,
  ref
) => {
  return (
    <Box
      ref={ref}
      flex="auto"
      {...props}
    >
      <Months />
    </Box>
  );
});

YearView.displayName = 'YearView';

export default YearView;
