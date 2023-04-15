import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useTableRowStyle } from './styles';
import useTable from './useTable';

const TableRow = forwardRef((props, ref) => {
  const { size, variant } = useTable();
  const styleProps = useTableRowStyle({ size, variant });

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
