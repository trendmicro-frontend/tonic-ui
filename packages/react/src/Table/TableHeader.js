import React, { forwardRef } from 'react';
import Box from '../Box';

const TableHeader = forwardRef(({
  children,
  ...props
}, ref) => {
  return (
    <Box
      ref={ref}
      overflow="hidden"
      flex="0 0 auto"
      {...props}
    >
      { children }
    </Box>
  );
});

TableHeader.displayName = 'TableHeader';

export default TableHeader;
