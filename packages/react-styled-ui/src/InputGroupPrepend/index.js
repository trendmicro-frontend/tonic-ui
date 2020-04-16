import React, { forwardRef } from 'react';
import Flex from '../Flex';
import { baseProps } from './styles';

const InputGroupPrepend = forwardRef((
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

InputGroupPrepend.displayName = 'InputGroupPrepend';

export default InputGroupPrepend;
