import {
  runIfFn,
} from '@tonic-ui/utils';
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
  const context = getMemoizedState({ size, variant });
  const styleProps = useInputGroupStyle();

  return (
    <InputGroupContext.Provider value={context}>
      <Box
        ref={ref}
        {...styleProps}
        {...rest}
      >
        {runIfFn(children, context)}
      </Box>
    </InputGroupContext.Provider>
  );
});

InputGroup.displayName = 'InputGroup';

export default InputGroup;
