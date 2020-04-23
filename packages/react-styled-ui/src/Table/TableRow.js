import React, { forwardRef } from 'react';
import Box from '../Box';
import { setColorWithOpacity } from '../theme/colors';
import { useTableContext } from './context';

const TableRow = forwardRef(({
  children,
  css,
  ...props
}, ref) => {
  const { hoverable } = useTableContext();
  if (hoverable) {
    css = [
      {
        '&:hover': {
          backgroundColor: setColorWithOpacity('white', 0.12),
        },
      },
      css,
    ];
  }
  return (
    <Box
      ref={ref}
      css={css}
      {...props}
    >
      { children }
    </Box>
  );
});

TableRow.displayName = 'TableRow';

export default TableRow;
