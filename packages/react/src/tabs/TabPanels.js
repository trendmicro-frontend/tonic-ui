import React, { forwardRef } from 'react';
import { Box } from '../box';

const TabPanels = forwardRef((props, ref) => {
  return (
    <Box
      ref={ref}
      {...props}
    />
  );
});

TabPanels.displayName = 'TabPanels';

export default TabPanels;
