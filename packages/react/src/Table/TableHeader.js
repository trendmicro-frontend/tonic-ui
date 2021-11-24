import React, { forwardRef } from 'react';
import Box from '../Box';

const TableHeader = forwardRef((
  {
    children,
    ...rest
  },
  ref,
) => {
  return (
    <Box
      ref={ref}
      overflow="hidden"
      flex="0 0 auto"
      {...rest}
    >
      { children }
    </Box>
  );
});

TableHeader.displayName = 'TableHeader';

export default TableHeader;
