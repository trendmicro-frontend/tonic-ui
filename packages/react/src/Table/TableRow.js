import React, { forwardRef } from 'react';
import Box from '../Box';
import { useTableRowStyle } from './styles';

const TableRow = forwardRef((props, ref) => {
  const styleProps = useTableRowStyle({});

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

TableRow.displayName = 'TableRow';

export default TableRow;
