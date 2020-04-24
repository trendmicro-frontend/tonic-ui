import React, { forwardRef } from 'react';
import Box from '../Box';

const TableHeaderRow = forwardRef(({
  children,
  ...props
}, ref) => {
  return (
    <Box
      ref={ref}
      {...props}
    >
      { children }
    </Box>
  );
});

TableHeaderRow.displayName = 'TableHeaderRow';

export default TableHeaderRow;
