import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';

const TabPanels = forwardRef((inProps, ref) => {
  const props = useDefaultProps({ props: inProps, name: 'TabPanels' });

  return (
    <Box
      ref={ref}
      {...props}
    />
  );
});

TabPanels.displayName = 'TabPanels';

export default TabPanels;
