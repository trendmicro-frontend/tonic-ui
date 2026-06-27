import { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import useShallowMemo from '../utils/useShallowMemo';
import { LAYOUT_FLEXBOX, LAYOUT_TABLE, SIZE_MEDIUM, VARIANT_DEFAULT } from './constants';
import { TableContext } from './context';
import { useTableStyle } from './styles';

/**
 * @typedef {Object} TableProps
 * @property {'flexbox' | 'table'} [layout='flexbox'] - The layout of the table.
 * @property {'sm' | 'md' | 'lg'} [size='md'] - The size of TableCells.
 * @property {'default' | 'outline'} [variant='default'] - The variant of the table style to use.
 * @property {React.ReactNode} [children] -
 */

/**
 * @type {ForwardRefComponent<'div', TableProps>}
 */
const Table = forwardRef((inProps, ref) => {
  const {
    layout = LAYOUT_FLEXBOX,
    role: roleProp,
    size = SIZE_MEDIUM,
    variant = VARIANT_DEFAULT,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Table' });
  const shallowMemo = useShallowMemo();
  const as = layout === LAYOUT_TABLE ? 'table' : undefined;
  const role = roleProp ?? 'table';

  const context = shallowMemo({
    layout,
    size,
    variant,
  });
  const styleProps = useTableStyle({ layout, variant });

  return (
    <TableContext.Provider value={context}>
      <Box
        as={as}
        ref={ref}
        role={role}
        {...styleProps}
        {...rest}
      />
    </TableContext.Provider>
  );
});

Table.displayName = 'Table';

export default Table;
