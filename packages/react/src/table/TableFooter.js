import { ensureArray } from 'ensure-type';
import memoize from 'micro-memoize';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { GROUP_VARIANT_FOOTER, LAYOUT_TABLE } from './constants';
import { TableGroupContext } from './context';
import { useTableFooterStyle } from './styles';
import useTable from './useTable';

const getMemoizedState = memoize(state => ({ ...state }));

const TableFooter = forwardRef((
  {
    role: roleProp,
    sx: sxProp,
    ...rest
  },
  ref,
) => {
  const { layout } = useTable();
  const styleProps = useTableFooterStyle({ layout });
  const as = layout === LAYOUT_TABLE ? 'tfoot' : undefined;
  const role = roleProp ?? 'rowgroup';
  const groupVariant = GROUP_VARIANT_FOOTER;
  const context = getMemoizedState({
    groupVariant,
  });

  return (
    <TableGroupContext.Provider value={context}>
      <Box
        as={as}
        ref={ref}
        role={role}
        sx={[styleProps, ...ensureArray(sxProp)]}
        {...rest}
      />
    </TableGroupContext.Provider>
  );
});

TableFooter.displayName = 'TableFooter';

export default TableFooter;
