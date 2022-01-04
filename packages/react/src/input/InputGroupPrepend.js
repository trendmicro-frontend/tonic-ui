import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useInputGroupPrependStyle } from './styles';

const InputGroupPrepend = forwardRef((props, ref) => {
  const styleProps = useInputGroupPrependStyle();

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

InputGroupPrepend.displayName = 'InputGroupPrepend';

export default InputGroupPrepend;
