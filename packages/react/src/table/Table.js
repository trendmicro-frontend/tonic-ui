import { useOnceWhen } from '@tonic-ui/react-hooks';
import { warnRemovedProps } from '@tonic-ui/utils';
import memoize from 'micro-memoize';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { LAYOUT_FLEXBOX, LAYOUT_TABLE, SIZE_MEDIUM, VARIANT_DEFAULT } from './constants';
import { TableContext } from './context';
import { useTableStyle } from './styles';

const getMemoizedState = memoize(state => ({ ...state }));

const Table = forwardRef((
  {
    isHoverable, // deprecated
    layout = LAYOUT_FLEXBOX,
    role: roleProp,
    size = SIZE_MEDIUM,
    variant = VARIANT_DEFAULT,
    ...rest
  },
  ref,
) => {
  { // deprecation warning
    const prefix = `${Table.displayName}:`;

    useOnceWhen(() => {
      warnRemovedProps('isHoverable', {
        prefix,
        message: 'Use the \'_hover\' prop on the \'TableRow\' component instead.',
      });
    }, (isHoverable !== undefined));
  }

  const as = layout === LAYOUT_TABLE ? 'table' : undefined;
  const role = roleProp ?? 'table';
  const context = getMemoizedState({
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
