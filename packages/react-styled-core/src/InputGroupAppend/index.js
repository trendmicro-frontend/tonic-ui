import React, { forwardRef } from 'react';
import Flex from '../Flex';
import { baseProps } from './styles';

const InputGroupAppend = forwardRef((
  props,
  ref,
) => {
  const styleProps = {
    ...baseProps,
  };

  return (
    <Flex
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

InputGroupAppend.displayName = 'InputGroupAppend';

export default InputGroupAppend;
