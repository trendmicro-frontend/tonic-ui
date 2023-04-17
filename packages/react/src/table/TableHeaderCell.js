import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useTableHeaderCellCSS, useTableHeaderCellStyle } from './styles';
import useTable from './useTable';

const TableHeaderCell = forwardRef((
  {
    children,
    css: cssProp,
    width = 150,
    ...rest
  },
  ref
) => {
  const { size, variant } = useTable();
  const css = [useTableHeaderCellCSS({ variant }), cssProp];
  const styleProps = useTableHeaderCellStyle({ size });

  return (
    <Box
      css={css}
      ref={ref}
      role="columnheader"
      width={width}
      {...styleProps}
      {...rest}
    >
      {children}
    </Box>
  );
});

TableHeaderCell.displayName = 'TableHeaderCell';

export default TableHeaderCell;
