import React, { forwardRef } from 'react';
import Box from '../Box';
import { useTableContext } from './context';
import { useTableCellStyle } from './styles';

const TableCell = forwardRef((
  {
    children,
    width = 150,
    ...rest
  },
  ref,
) => {
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
      {...rest}
    >
      { children }
    </Box>
  );
});

TableCell.displayName = 'TableCell';

export default TableCell;
