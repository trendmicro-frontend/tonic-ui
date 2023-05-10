import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useTableCellStyle } from './styles';
import useTable from './useTable';

const TableCell = forwardRef((
  {
    role: roleProp,
    ...rest
  },
  ref,
) => {
  const role = roleProp ?? 'cell';
  const { layout, size, variant } = useTable();
  const styleProps = useTableCellStyle({ layout, size, variant });

  return (
    <Box
      ref={ref}
      role={role}
      {...styleProps}
      {...rest}
    />
  );
});

TableCell.displayName = 'TableCell';

export default TableCell;
