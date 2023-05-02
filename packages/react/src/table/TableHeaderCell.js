import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useTableHeaderCellStyle } from './styles';
import useTable from './useTable';

const TableHeaderCell = forwardRef((
  {
    role: roleProp,
    ...rest
  },
  ref
) => {
  const role = roleProp ?? 'columnheader';
  const { layout, size, variant } = useTable();
  const styleProps = useTableHeaderCellStyle({ layout, size, variant });

  return (
    <Box
      ref={ref}
      role={role}
      {...styleProps}
      {...rest}
    />
  );
});

TableHeaderCell.displayName = 'TableHeaderCell';

export default TableHeaderCell;
