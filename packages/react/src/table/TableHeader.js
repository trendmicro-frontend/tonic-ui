import { ensureArray } from 'ensure-type';
import memoize from 'micro-memoize';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { GROUP_VARIANT_HEADER, LAYOUT_TABLE } from './constants';
import { TableGroupContext } from './context';
import { useTableHeaderStyle } from './styles';
import useTable from './useTable';

const getMemoizedState = memoize(state => ({ ...state }));

const TableHeader = forwardRef((
  {
    role: roleProp,
    sx: sxProp,
    ...rest
  },
  ref,
) => {
  const { layout } = useTable();
  const styleProps = useTableHeaderStyle({ layout });
  const as = layout === LAYOUT_TABLE ? 'thead' : undefined;
  const role = roleProp ?? 'rowgroup';
  const groupVariant = GROUP_VARIANT_HEADER;
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

TableHeader.displayName = 'TableHeader';

export default TableHeader;
