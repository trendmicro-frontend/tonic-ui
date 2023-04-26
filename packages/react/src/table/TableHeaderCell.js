import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useTableHeaderCellStyle } from './styles';
import useTable from './useTable';

const TableHeaderCell = forwardRef((
  {
    role: roleProp,
    width = 150,
    ...rest
  },
  ref
) => {
  const role = roleProp ?? 'columnheader';
  const { size, variant } = useTable();
  const styleProps = useTableHeaderCellStyle({ size, variant });

  return (
    <Box
      ref={ref}
      role={role}
      width={width}
      {...styleProps}
      {...rest}
    />
  );
});

TableHeaderCell.displayName = 'TableHeaderCell';

export default TableHeaderCell;
