import React, { forwardRef } from 'react';
import Box from '../Box';
import { useOptionStyle } from './styles';

const Option = forwardRef((props, ref) => {
  const styleProps = useOptionStyle();

  return (
    <Box
      as="option"
      {...styleProps}
      {...props}
    />
  );
});

Option.displayName = 'Option';

export default Option;
