import { useOnceWhen } from '@tonic-ui/react-hooks';
import { warnRemovedProps } from '@tonic-ui/utils';
import memoize from 'micro-memoize';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { defaultSize, defaultVariant } from './constants';
import { TableContext } from './context';
import { useTableStyle } from './styles';

const getMemoizedState = memoize(state => ({ ...state }));

const Table = forwardRef((
  {
    isHoverable, // deprecated
    role: roleProp,
    size = defaultSize,
    variant = defaultVariant,
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

  const role = roleProp ?? 'table';
  const styleProps = useTableStyle();
  const context = getMemoizedState({
    size,
    variant,
  });

  return (
    <TableContext.Provider value={context}>
      <Box
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
