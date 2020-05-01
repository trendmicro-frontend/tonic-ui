import React, { forwardRef } from 'react';
import Box from '../Box';
import Flex from '../Flex';
import useColorMode from '../useColorMode';
import { TableProvider } from './context';

const Table = forwardRef((
  {
    variant = 'default',
    size = 'md',
    isHoverable,
    children,
    ...rest
  },
  ref,
) => {
  const minimalist = (variant === 'default');
  const context = {
    variant,
    isHoverable,
    size,
  };

  return (
    <TableProvider value={context}>
      <Flex
        ref={ref}
        display="inline-flex"
        position="relative"
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

const VerticalLine = (props) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  return (
    <Box
      borderLeft={1}
      borderColor={isDark ? 'gray:70' : 'gray:50'}
      height="100%"
      width="1px"
      {...props}
    />
  );
};
const HorizontalLine = (props) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  return (
    <Box
      borderTop={1}
      borderColor={isDark ? 'gray:70' : 'gray:50'}
      height="1px"
      width="100%"
      {...props}
    />
  );
};

Table.displayName = 'Table';

export default Table;
