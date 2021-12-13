import React, { forwardRef } from 'react';
import Box from '../Box';
import { useTableHeaderRowStyle } from './styles';

const TableHeaderRow = forwardRef((props, ref) => {
  const styleProps = useTableHeaderRowStyle({});

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
