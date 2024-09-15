import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { useCodeStyle } from './styles';

const Code = forwardRef((inProps, ref) => {
  const props = useDefaultProps({ props: inProps, name: 'Code' });
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
