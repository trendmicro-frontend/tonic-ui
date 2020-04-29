import React, { forwardRef } from 'react';
import Flex from '../Flex';

const TableHeaderRow = forwardRef(({
  children,
  ...props
}, ref) => {
  return (
    <Flex
      ref={ref}
      {...props}
    >
      { children }
    </Flex>
  );
});

TableHeaderRow.displayName = 'TableHeaderRow';

export default TableHeaderRow;
