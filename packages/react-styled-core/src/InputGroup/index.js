import memoize from 'micro-memoize';
import React, { cloneElement, forwardRef } from 'react';
import Box from '../Box';
import Input from '../Input';
import { InputGroupProvider } from './context';
import {
  baseProps,
} from './styles';

const getMemoizedState = memoize(state => ({ ...state }));

const InputGroup = forwardRef((
  {
    children,
    size = 'md',
    variant = 'outline',
    ...rest
  },
  ref
) => {
  const inputGroupState = getMemoizedState({ size, variant });
  const styleProps = {
    ...baseProps,
  };

  return (
    <InputGroupProvider value={inputGroupState}>
      <Box
        ref={ref}
        {...styleProps}
        {...rest}
      >
        {children}
      </Box>
    </InputGroupProvider>
  );
});

InputGroup.displayName = 'InputGroup';

export default InputGroup;
