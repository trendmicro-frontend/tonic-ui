import React, { forwardRef } from 'react';
import PseudoBox from '../PseudoBox';

const TableRow = forwardRef(({
  children,
  ...props
}, ref) => {
  return (
    <PseudoBox
      ref={ref}
      display="flex"
      {...props}
    >
      { children }
    </PseudoBox>
  );
});

TableRow.displayName = 'TableRow';

export default TableRow;
