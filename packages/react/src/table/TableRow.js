import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useTableRowCSS, useTableRowStyle } from './styles';
import useTable from './useTable';

const TableRow = forwardRef((
  {
    css: cssProp,
    role: roleProp,
    ...rest
  },
  ref,
) => {
  const role = roleProp ?? 'row';
  const { layout, variant } = useTable();
  const css = [useTableRowCSS({ role, variant }), cssProp];
  const styleProps = useTableRowStyle({ layout });

  return (
    <Box
      css={css}
      ref={ref}
      role={role}
      {...styleProps}
      {...rest}
    />
  );
});

TableRow.displayName = 'TableRow';

export default TableRow;
