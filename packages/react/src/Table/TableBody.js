import React, { forwardRef } from 'react';
import Box from '../Box';

const TableBody = forwardRef(({
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

TableBody.displayName = 'TableBody';

export default TableBody;
