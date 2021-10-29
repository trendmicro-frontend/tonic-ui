import React, { forwardRef } from 'react';
import PseudoBox from '../PseudoBox';
import { useTableContext } from './context';
import { useTableCellStyle } from './styles';

const TableCell = forwardRef(({
  children,
  width = 150,
  ...props
}, ref) => {
  const { size, variant } = useTableContext();
  const tableCellStyle = useTableCellStyle({
    size,
    variant,
  });

  return (
    <PseudoBox
      ref={ref}
      width={width}
      {...tableCellStyle}
      {...props}
    >
      { children }
    </PseudoBox>
  );
});

TableCell.displayName = 'TableCell';

export default TableCell;
