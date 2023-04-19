import { useOnceWhen } from '@tonic-ui/react-hooks';
import { warnRemovedProps } from '@tonic-ui/utils';
import memoize from 'micro-memoize';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { TableContext } from './context';
import { useTableStyle } from './styles';

const getMemoizedState = memoize(state => ({ ...state }));

const Table = forwardRef((
  {
    isHoverable, // deprecated
    children,
    size = 'md',
    variant = 'default',
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

  const styleProps = useTableStyle({ variant });
  const context = getMemoizedState({
    variant,
    size,
  });

  return (
    <TableContext.Provider value={context}>
      <Box
        ref={ref}
        role="table"
        {...styleProps}
        {...rest}
      >
        {children}
      </Box>
    </TableContext.Provider>
  );
});

Table.displayName = 'Table';

export default Table;
