import { runIfFn } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import useShallowMemo from '../utils/useShallowMemo';
import { InputGroupContext } from './context';
import { useInputGroupStyle } from './styles';


const InputGroup = forwardRef((inProps, ref) => {
  const {
    children,
    size = 'md',
    variant = 'outline',
    ...rest
  } = useDefaultProps({ props: inProps, name: 'InputGroup' });
  const shallowMemo = useShallowMemo();

  const context = shallowMemo({ size, variant });
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
