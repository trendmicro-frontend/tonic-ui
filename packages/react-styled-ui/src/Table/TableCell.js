import React, { forwardRef } from 'react';
import Box from '../Box';
import { useTableContext } from './context';

const TableCell = forwardRef(({
  children,
  ...props
}, ref) => {
  const { minimalist } = useTableContext();
  const tableCellStyle = getTableCellStyle({ minimalist });
  return (
    <Box
      ref={ref}
      {...tableCellStyle}
      {...props}
    >
      { children }
    </Box>
  );
});

const getTableCellStyle = ({
  minimalist,
}) => {
  const baseStyle = {
    px: '3x',
    py: '2x',
    color: 'white:primary',
    borderBottom: 1,
    borderColor: 'gray:70',
  };

  if (minimalist) {
    return baseStyle;
  }

  return {
    borderRight: 1,
    ...baseStyle,
  };
};

TableCell.displayName = 'TableCell';

export default TableCell;
