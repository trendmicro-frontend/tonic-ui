import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useStackItemStyle } from './styles';

const StackItem = forwardRef((props, ref) => {
  const styleProps = useStackItemStyle();

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

StackItem.displayName = 'StackItem';

export default StackItem;
