import React, { forwardRef } from 'react';
import { Box } from '../box';

const TableBody = forwardRef((props, ref) => {
  return (
    <Box
      ref={ref}
      {...props}
    />
  );
});

TableBody.displayName = 'TableBody';

export default TableBody;
