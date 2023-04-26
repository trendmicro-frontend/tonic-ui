import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useTableHeaderStyle } from './styles';

const TableHeader = forwardRef((
  {
    role: roleProp,
    ...rest
  },
  ref,
) => {
  const role = roleProp ?? 'rowgroup';
  const styleProps = useTableHeaderStyle();

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
