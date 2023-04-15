import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useTableCellStyle } from './styles';
import useTable from './useTable';

const TableCell = forwardRef((
  {
    children,
    width = 150,
    ...rest
  },
  ref,
) => {
  const { size, variant } = useTable();
  const tableCellStyle = useTableCellStyle({ size, variant });

  return (
    <Box
      ref={ref}
      width={width}
      {...tableCellStyle}
      {...rest}
    >
      {children}
    </Box>
  );
});

TableCell.displayName = 'TableCell';

export default TableCell;
