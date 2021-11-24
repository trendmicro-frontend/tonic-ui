import React, { forwardRef } from 'react';
import Flex from '../Flex';

const TableHeaderRow = forwardRef((
  {
    children,
    ...rest
  },
  ref,
) => {
  return (
    <Flex
      ref={ref}
      {...rest}
    >
      {children}
    </Flex>
  );
});

TableHeaderRow.displayName = 'TableHeaderRow';

export default TableHeaderRow;
