import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import useShallowMemo from '../utils/useShallowMemo';
import { GROUP_VARIANT_FOOTER, LAYOUT_TABLE } from './constants';
import { TableGroupContext } from './context';
import { useTableFooterStyle } from './styles';
import useTable from './useTable';

const TableFooter = forwardRef((inProps, ref) => {
  const {
    role: roleProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'TableFooter' });
  const shallowMemo = useShallowMemo();
  const { layout } = useTable();
  const as = layout === LAYOUT_TABLE ? 'tfoot' : undefined;
  const role = roleProp ?? 'rowgroup';
  const groupVariant = GROUP_VARIANT_FOOTER;

  const context = shallowMemo({
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
