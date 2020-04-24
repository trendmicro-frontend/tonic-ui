import React, { forwardRef } from 'react';
import Box from '../Box';
import useColorMode from '../useColorMode';
import { useTableContext } from './context';

const TableCell = forwardRef(({
  children,
  ...props
}, ref) => {
  const { colorMode } = useColorMode();
  const { minimalist } = useTableContext();
  const tableCellStyle = getTableCellStyle({ colorMode, minimalist });
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
  colorMode,
  minimalist,
}) => {
  const baseStyle = {
    px: '3x',
    py: '2x',
    borderBottom: 2,
  };
  const colorStyle = {
    light: {
      color: 'black:primary',
      borderColor: 'gray:50',
    },
    dark: {
      color: 'white:primary',
      borderColor: 'gray:70',
    }
  };

  if (minimalist) {
    return {
      ...baseStyle,
      ...colorStyle[colorMode],
    };
  }

  return {
    borderRight: 1,
    ...baseStyle,
    ...colorStyle[colorMode],
  };
};

TableCell.displayName = 'TableCell';

export default TableCell;
