import React, { forwardRef } from 'react';
import Box from '../Box';
import { useTableContext } from './context';
import { useTableHeaderCellStyle } from './styles';

const TableHeaderCell = forwardRef(({
  children,
  ...props
}, ref) => {
  const { size, variant } = useTableContext();
  const tableHeaderCellStyle = useTableHeaderCellStyle({
    size,
    variant,
  });
  return (
    <Box
      ref={ref}
      {...tableHeaderCellStyle}
      {...props}
    >
      { children }
    </Box>
  );
});

TableHeaderCell.displayName = 'TableHeaderCell';

export default TableHeaderCell;
