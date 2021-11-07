import React, { forwardRef } from 'react';
import Box from '../Box';
import { useTableContext } from './context';
import { useTableCellStyle } from './styles';

const TableCell = forwardRef(({
  children,
  width = 150,
  ...props
}, ref) => {
  const { size, variant } = useTableContext();
  const tableCellStyle = useTableCellStyle({
    size,
    variant,
  });

  return (
    <Box
      ref={ref}
      width={width}
      {...tableCellStyle}
      {...props}
    >
      { children }
    </Box>
  );
});

TableCell.displayName = 'TableCell';

export default TableCell;
