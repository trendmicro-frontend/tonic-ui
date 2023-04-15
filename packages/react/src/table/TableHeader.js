import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useTableHeaderStyle } from './styles';

const TableHeader = forwardRef((props, ref) => {
  const styleProps = useTableHeaderStyle();

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

TableHeader.displayName = 'TableHeader';

export default TableHeader;
