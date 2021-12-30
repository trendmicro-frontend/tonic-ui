import memoize from 'micro-memoize';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { InputGroupContext } from './context';
import { useInputGroupStyle } from './styles';

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
  const styleProps = useInputGroupStyle();

  return (
    <InputGroupContext.Provider value={inputGroupState}>
      <Box
        ref={ref}
        {...styleProps}
        {...rest}
      >
        {children}
      </Box>
    </InputGroupContext.Provider>
  );
});

InputGroup.displayName = 'InputGroup';

export default InputGroup;
