import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useTableBodyStyle } from './styles';

const TableBody = forwardRef((props, ref) => {
  const styleProps = useTableBodyStyle();

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

TableBody.displayName = 'TableBody';

export default TableBody;
