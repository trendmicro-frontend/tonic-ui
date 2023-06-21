import {
  Flex,
} from '@tonic-ui/react';
import React, { forwardRef } from 'react';

const Toolbar = forwardRef((props, ref) => {
  const styleProps = {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    columnGap: '6x',
  };

  return (
    <Flex
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

Toolbar.displayName = 'Toolbar';

export default Toolbar;
