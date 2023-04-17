import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useTableRowStyle } from './styles';
import useTable from './useTable';

const TableRow = forwardRef((props, ref) => {
  const { variant } = useTable();
  const styleProps = useTableRowStyle({ variant });

  return (
    <Box
      ref={ref}
      role="row"
      {...styleProps}
      {...props}
    />
  );
});

TableRow.displayName = 'TableRow';

export default TableRow;
