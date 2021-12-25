import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useOptionGroupStyle } from './styles';

const OptionGroup = forwardRef((props, ref) => {
  const styleProps = useOptionGroupStyle();

  return (
    <Box
      as="optgroup"
      {...styleProps}
      {...props}
    />
  );
});

OptionGroup.displayName = 'OptionGroup';

export default OptionGroup;
