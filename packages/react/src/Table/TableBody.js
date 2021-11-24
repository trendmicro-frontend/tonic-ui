import React, { forwardRef } from 'react';
import Box from '../Box';

const TableBody = forwardRef((
  {
    children,
    ...rest
  },
  ref,
) => {
  return (
    <Box
      ref={ref}
      {...rest}
    >
      {children}
    </Box>
  );
});

TableBody.displayName = 'TableBody';

export default TableBody;
