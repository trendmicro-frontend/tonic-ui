import React, { forwardRef } from 'react';
import Box from '../Box';
import { setColorWithOpacity } from '../theme/colors';
import useColorMode from '../useColorMode';
import { useTableContext } from './context';

const TableRow = forwardRef((
  {
    children,
    ...rest
  },
  ref,
) => {
  // TODO: isHoverable is deprecated and will be removed in the v1 release
  const { isHoverable } = useTableContext();
  const [colorMode] = useColorMode();
  const isDark = colorMode === 'dark';
  const bg = isDark ? 'white' : 'black';
  return (
    <Box
      ref={ref}
      display="flex"
      _hover={{
        backgroundColor: isHoverable ? setColorWithOpacity(bg, 0.12) : undefined
      }}
      {...rest}
    >
      {children}
    </Box>
  );
});

TableRow.displayName = 'TableRow';

export default TableRow;
