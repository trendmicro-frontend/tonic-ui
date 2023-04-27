import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useTableHeaderRowStyle } from './styles';

const TableHeaderRow = forwardRef((
  {
    role: roleProp,
    ...rest
  },
  ref,
) => {
  const role = roleProp ?? 'row';
  const styleProps = useTableHeaderRowStyle();

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
