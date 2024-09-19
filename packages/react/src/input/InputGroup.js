import { runIfFn } from '@tonic-ui/utils';
import memoize from 'micro-memoize';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { InputGroupContext } from './context';
import { useInputGroupStyle } from './styles';

const getMemoizedState = memoize(state => ({ ...state }));

const InputGroup = forwardRef((inProps, ref) => {
  const {
    children,
    size = 'md',
    variant = 'outline',
    ...rest
  } = useDefaultProps({ props: inProps, name: 'InputGroup' });
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
