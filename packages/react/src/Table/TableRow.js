import React, { forwardRef } from 'react';
import Box from '../Box';

const TableRow = forwardRef((props, ref) => {
  return (
    <Box
      ref={ref}
      display="flex"
      {...props}
    />
  );
});

TableRow.displayName = 'TableRow';

export default TableRow;
