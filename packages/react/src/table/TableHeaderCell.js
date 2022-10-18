import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useTableHeaderCellStyle } from './styles';
import useTable from './useTable';

const TableHeaderCell = forwardRef((
  {
    children,
    width = 150,
    ...rest
  },
  ref
) => {
  const { size, variant } = useTable();
  const tableHeaderCellStyle = useTableHeaderCellStyle({
    size,
    variant,
  });
  return (
    <Box
      ref={ref}
      width={width}
      {...tableHeaderCellStyle}
      {...rest}
    >
      {children}
    </Box>
  );
});

TableHeaderCell.displayName = 'TableHeaderCell';

export default TableHeaderCell;
