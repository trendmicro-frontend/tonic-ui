import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useTableHeaderRowStyle } from './styles';
import useTable from './useTable';

const TableHeaderRow = forwardRef((props, ref) => {
  const { size } = useTable();
  const styleProps = useTableHeaderRowStyle({ size });

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

TableHeaderRow.displayName = 'TableHeaderRow';

export default TableHeaderRow;
