import React, { forwardRef } from 'react';
import PseudoBox from '../PseudoBox';
import { setColorWithOpacity } from '../theme/colors';
import useColorMode from '../useColorMode';
import { useTableContext } from './context';

const TableRow = forwardRef(({
  children,
  ...props
}, ref) => {
  const { hoverable } = useTableContext();
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  const bg = isDark ? 'white' : 'black';
  return (
    <PseudoBox
      ref={ref}
      display="flex"
      _hover={{
        backgroundColor: hoverable ? setColorWithOpacity(bg, 0.12) : undefined
      }}
      {...props}
    >
      { children }
    </PseudoBox>
  );
});

TableRow.displayName = 'TableRow';

export default TableRow;
