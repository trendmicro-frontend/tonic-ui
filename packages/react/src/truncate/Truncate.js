import React, { forwardRef } from 'react';
import { Text } from '../text';
import { useTruncateStyle } from './styles';

const Truncate = forwardRef((props, ref) => {
  const styleProps = useTruncateStyle();

  return (
    <Text
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

Truncate.displayName = 'Truncate';

export default Truncate;
