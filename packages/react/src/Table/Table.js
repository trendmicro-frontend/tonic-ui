import React, { forwardRef, useEffect } from 'react';
import Box from '../Box';
import Flex from '../Flex';
import useColorMode from '../useColorMode';
import { TableProvider } from './context';

const Table = forwardRef((
  {
    isHoverable, // deprecated
    children,
    size = 'md',
    variant = 'default',
    ...rest
  },
  ref,
) => {
  useEffect(() => {
    if (typeof isHoverable !== 'undefined') {
      console.error('Warning: The `isHoverable` prop is deprecated and will be removed in next major release. Pass a `_hover` prop on the `TableRow` instead.');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const minimalist = (variant === 'default');
  const context = {
    isHoverable, // deprecated
    variant,
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
  const [colorMode] = useColorMode();
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
  const [colorMode] = useColorMode();
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
