import memoize from 'micro-memoize';
import React, { forwardRef } from 'react';
import PseudoBox from '../PseudoBox';
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
      <PseudoBox
        ref={ref}
        {...styleProps}
        {...rest}
      >
        {children}
      </PseudoBox>
    </InputGroupProvider>
  );
});

InputGroup.displayName = 'InputGroup';

export default InputGroup;
