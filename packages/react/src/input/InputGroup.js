import { runIfFn } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import useShallowMemo from '../utils/useShallowMemo';
import { InputGroupContext } from './context';
import { useInputGroupStyle } from './styles';

/**
 * @typedef {Object} InputGroupProps
 * @property {React.ReactNode | ((context: { size: 'sm' | 'md' | 'lg'; variant: 'outline' | 'filled' | 'flush' | 'unstyled' }) => React.ReactNode)} [children] - A function child can be used intead of a React element. This function is called with the context object.
 * @property {'sm' | 'md' | 'lg'} [size='md'] - The relative size to the input group itself.
 * @property {'outline' | 'filled' | 'flush' | 'unstyled'} [variant='outline'] - The variant of the input style to use.
 */

/**
 * @type {ForwardRefComponent<'div', InputGroupProps>}
 */
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
