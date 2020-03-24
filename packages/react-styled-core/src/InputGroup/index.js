import memoize from 'micro-memoize';
import React, { Children, cloneElement, forwardRef, isValidElement } from 'react';
import Box from '../Box';
import Input from '../Input';
import { InputGroupProvider } from './context';
import {
  baseProps,
  getInputProps,
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
  const childArray = Children
    .toArray(children)
    .filter(child => isValidElement(child));
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
        {childArray.map(child => {
          let childProps = {
            size: child.props.size ?? size,
            variant: child.props.variant ?? variant,
          };

          if (child.type === Input) {
            const inputProps = getInputProps(childProps);
            return cloneElement(child, inputProps);
          }

          return cloneElement(child, childProps);
        })}
      </Box>
    </InputGroupProvider>
  );
});

InputGroup.displayName = 'InputGroup';

export default InputGroup;
