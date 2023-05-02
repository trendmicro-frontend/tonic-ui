import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useTableBodyStyle } from './styles';
import useTable from './useTable';

const TableBody = forwardRef((
  {
    role: roleProp,
    ...rest
  },
  ref,
) => {
  const role = roleProp ?? 'rowgroup';
  const { layout } = useTable();
  const styleProps = useTableBodyStyle({ layout });

  return (
    <Box
      ref={ref}
      role={role}
      {...styleProps}
      {...rest}
    />
  );
});

TableBody.displayName = 'TableBody';

export default TableBody;
