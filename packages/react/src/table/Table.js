import { useOnceWhen } from '@tonic-ui/react-hooks';
import { warnRemovedProps } from '@tonic-ui/utils';
import memoize from 'micro-memoize';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useColorMode } from '../color-mode';
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

  const styleProps = useTableStyle({});
  const minimalist = (variant === 'default');
  const context = getMemoizedState({
    variant,
    size,
  });

  return (
    <TableContext.Provider value={context}>
      <Box
        ref={ref}
        {...styleProps}
        {...rest}
      >
        { children }
        { !minimalist && (
          <>
            <HorizontalLine position="absolute" top="0" />
            <VerticalLine position="absolute" top="0" right="0" />
            <HorizontalLine position="absolute" bottom="0" />
            <VerticalLine position="absolute" top="0" left="0" />
          </>
        )}
      </Box>
    </TableContext.Provider>
  );
});

const VerticalLine = (props) => {
  const [colorMode] = useColorMode();
  const isDark = colorMode === 'dark';
  return (
    <Box
      borderLeft={1}
      borderColor={isDark ? 'gray:70' : 'gray:50'}
      height="100%"
      width="1px"
      {...props}
    />
  );
};
const HorizontalLine = (props) => {
  const [colorMode] = useColorMode();
  const isDark = colorMode === 'dark';
  return (
    <Box
      borderTop={1}
      borderColor={isDark ? 'gray:70' : 'gray:50'}
      height="1px"
      width="100%"
      {...props}
    />
  );
};

Table.displayName = 'Table';

export default Table;
