import React, { forwardRef } from 'react';
import Box from '../Box';
import Flex from '../Flex';
import { TableProvider } from './context';

const Table = forwardRef((
  {
    minimalist,
    hoverable,
    children,
    height,
    width,
    ...rest
  },
  ref,
) => {
  const tableHeight = !!height ? `${height}px` : 'auto';
  const tableWidth = !!width ? `${width}px` : 'auto';
  const context = {
    minimalist,
    hoverable,
  };

  return (
    <TableProvider value={context}>
      <Flex
        ref={ref}
        position="relative"
        height={tableHeight}
        width={tableWidth}
        direction="column"
        {...rest}
      >
        { children }
        { !minimalist && (
          <>
            <HorizontalLine position="absolute" top="0" />
            <VerticalLine position="absolute" top="0" right="0" />
            <HorizontalLine position="absolute" bottom="0" />
            <VerticalLine position="absolute" top="0" left="0" />
          </>
        )}
      </Flex>
    </TableProvider>
  );
});

const VerticalLine = (props) => (
  <Box
    borderLeft={1}
    borderColor="gray:70"
    height="100%"
    width="1px"
    {...props}
  />
);
const HorizontalLine = (props) => (
  <Box
    borderTop={1}
    borderColor="gray:70"
    height="1px"
    width="100%"
    {...props}
  />
);

Table.displayName = 'Table';

export default Table;
