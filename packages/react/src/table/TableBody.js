import memoize from 'micro-memoize';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { GROUP_VARIANT_BODY, LAYOUT_TABLE } from './constants';
import { TableGroupContext } from './context';
import { useTableBodyStyle } from './styles';
import useTable from './useTable';

const getMemoizedState = memoize(state => ({ ...state }));

const TableBody = forwardRef((
  {
    role: roleProp,
    ...rest
  },
  ref,
) => {
  const { layout } = useTable();
  const as = layout === LAYOUT_TABLE ? 'tbody' : undefined;
  const role = roleProp ?? 'rowgroup';
  const groupVariant = GROUP_VARIANT_BODY;
  const context = getMemoizedState({
    groupVariant,
  });
  const styleProps = useTableBodyStyle({ layout });

  return (
    <TableGroupContext.Provider value={context}>
      <Box
        as={as}
        ref={ref}
        role={role}
        {...styleProps}
        {...rest}
      />
    </TableGroupContext.Provider>
  );
});

TableBody.displayName = 'TableBody';

export default TableBody;
