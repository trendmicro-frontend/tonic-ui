import React, { forwardRef } from 'react';
import Box from '../Box';

const TableRow = forwardRef(({
  children,
  ...props
}, ref) => {
  return (
    <Box
      ref={ref}
      display="flex"
      {...props}
    >
      { children }
    </Box>
  );
});

TableRow.displayName = 'TableRow';

export default TableRow;
