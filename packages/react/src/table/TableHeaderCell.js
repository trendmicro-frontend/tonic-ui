import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useTableContext } from './context';
import { useTableHeaderCellStyle } from './styles';

const TableHeaderCell = forwardRef((
  {
    children,
    width = 150,
    ...rest
  },
  ref
) => {
  const { size, variant } = useTableContext();
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
