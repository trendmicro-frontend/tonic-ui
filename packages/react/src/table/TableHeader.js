import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useTableHeaderStyle } from './styles';
import useTable from './useTable';

const TableHeader = forwardRef((
  {
    role: roleProp,
    ...rest
  },
  ref,
) => {
  const role = roleProp || 'rowgroup';
  const { layout } = useTable();
  const styleProps = useTableHeaderStyle({ layout });

  return (
    <Box
      ref={ref}
      role={role}
      {...styleProps}
      {...rest}
    />
  );
});

TableHeader.displayName = 'TableHeader';

export default TableHeader;
