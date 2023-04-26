import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useTableBodyStyle } from './styles';

const TableBody = forwardRef((
  {
    css: cssProp,
    role: roleProp,
    ...rest
  },
  ref,
) => {
  const role = roleProp ?? 'rowgroup';
  const styleProps = useTableBodyStyle();

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
