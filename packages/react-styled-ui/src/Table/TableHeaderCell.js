import React, { forwardRef } from 'react';
import PseudoBox from '../PseudoBox';
import { useTableContext } from './context';
import { useTableHeaderCellStyle } from './styles';

const TableHeaderCell = forwardRef(({
  children,
  width = 150,
  ...props
}, ref) => {
  const { size, variant } = useTableContext();
  const tableHeaderCellStyle = useTableHeaderCellStyle({
    size,
    variant,
  });
  return (
    <PseudoBox
      ref={ref}
      width={width}
      {...tableHeaderCellStyle}
      {...props}
    >
      { children }
    </PseudoBox>
  );
});

TableHeaderCell.displayName = 'TableHeaderCell';

export default TableHeaderCell;
