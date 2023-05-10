import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useTableHeaderRowStyle } from './styles';
import useTable from './useTable';

const TableHeaderRow = forwardRef((
  {
    role: roleProp,
    ...rest
  },
  ref,
) => {
  const role = roleProp ?? 'row';
  const { layout } = useTable();
  const styleProps = useTableHeaderRowStyle({ layout });

  return (
    <Box
      ref={ref}
      role={role}
      {...styleProps}
      {...rest}
    />
  );
});

TableHeaderRow.displayName = 'TableHeaderRow';

export default TableHeaderRow;
