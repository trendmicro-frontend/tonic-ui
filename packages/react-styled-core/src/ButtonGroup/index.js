import memoize from 'micro-memoize';
import React, { forwardRef } from 'react';
import Box from '../Box';
import { ButtonGroupProvider } from './context';

const getMemoizedState = memoize(state => ({ ...state }));

const ButtonGroup = forwardRef((
  {
    children,
    size = 'md',
    variant = 'default',
    vertical,
    ...rest
  },
  ref
) => {
  const buttonGroupState = getMemoizedState({ size, variant, vertical });
  return (
    <ButtonGroupProvider value={buttonGroupState}>
      <Box
        ref={ref}
        display="inline-flex"
        flexDirection={vertical ? 'column' : 'row'}
        {...rest}
      >
        {children}
      </Box>
    </ButtonGroupProvider>
  );
});

export default ButtonGroup;
