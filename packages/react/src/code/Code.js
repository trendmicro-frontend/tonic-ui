import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useCodeStyle } from './styles';

const Code = forwardRef((props, ref) => {
  const styleProps = useCodeStyle();

  return (
    <Box
      as="code"
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

Code.displayName = 'Code';

export default Code;
