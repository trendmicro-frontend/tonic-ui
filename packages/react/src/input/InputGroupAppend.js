import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useInputGroupAppendStyle } from './styles';

const InputGroupAppend = forwardRef((props, ref) => {
  const styleProps = useInputGroupAppendStyle();

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

InputGroupAppend.displayName = 'InputGroupAppend';

export default InputGroupAppend;
