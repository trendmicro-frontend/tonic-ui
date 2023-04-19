import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useTableCellCSS, useTableCellStyle } from './styles';
import useTable from './useTable';

const TableCell = forwardRef((
  {
    children,
    css: cssProp,
    role: roleProp,
    width = 150,
    ...rest
  },
  ref,
) => {
  const { size, variant } = useTable();
  const role = roleProp ?? 'cell';
  const css = [useTableCellCSS({ role, variant }), cssProp];
  const styleProps = useTableCellStyle({ size });

  return (
    <Box
      css={css}
      ref={ref}
      role={role}
      width={width}
      {...styleProps}
      {...rest}
    >
      {children}
    </Box>
  );
});

TableCell.displayName = 'TableCell';

export default TableCell;
