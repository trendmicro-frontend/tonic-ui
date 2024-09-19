import memoize from 'micro-memoize';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { GROUP_VARIANT_FOOTER, LAYOUT_TABLE } from './constants';
import { TableGroupContext } from './context';
import { useTableFooterStyle } from './styles';
import useTable from './useTable';

const getMemoizedState = memoize(state => ({ ...state }));

const TableFooter = forwardRef((inProps, ref) => {
  const {
    role: roleProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'TableFooter' });
  const { layout } = useTable();
  const as = layout === LAYOUT_TABLE ? 'tfoot' : undefined;
  const role = roleProp ?? 'rowgroup';
  const groupVariant = GROUP_VARIANT_FOOTER;
  const context = getMemoizedState({
    groupVariant,
  });
  const styleProps = useTableFooterStyle({ layout });

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

TableFooter.displayName = 'TableFooter';

export default TableFooter;
