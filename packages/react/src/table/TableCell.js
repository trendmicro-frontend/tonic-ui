import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useTableCellStyle } from './styles';
import useTable from './useTable';

const TableCell = forwardRef((
  {
    role: roleProp,
    width = 150,
    ...rest
  },
  ref,
) => {
  const role = roleProp ?? 'cell';
  const { size, variant } = useTable();
  const styleProps = useTableCellStyle({ size, variant });

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

TableCell.displayName = 'TableCell';

export default TableCell;
