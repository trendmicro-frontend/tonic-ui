import { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import useShallowMemo from '../utils/useShallowMemo';
import { GROUP_VARIANT_HEADER, LAYOUT_TABLE } from './constants';
import { TableGroupContext } from './context';
import { useTableHeaderStyle } from './styles';
import useTable from './useTable';

/**
 * @typedef {Object} TableHeaderProps
 * @property {React.ReactNode} [children] - The content of the table header.
 */

/**
 * @type {ForwardRefComponent<'div', TableHeaderProps>}
 */
const TableHeader = forwardRef((inProps, ref) => {
  const {
    role: roleProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'TableHeader' });
  const shallowMemo = useShallowMemo();
  const { layout } = useTable();
  const as = layout === LAYOUT_TABLE ? 'thead' : undefined;
  const role = roleProp ?? 'rowgroup';
  const groupVariant = GROUP_VARIANT_HEADER;

  const context = shallowMemo({
    groupVariant,
  });
  const styleProps = useTableHeaderStyle({ layout });

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

TableHeader.displayName = 'TableHeader';

export default TableHeader;
