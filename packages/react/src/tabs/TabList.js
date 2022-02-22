import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useTabListStyle } from './styles';

const defaultOrientation = 'horizontal';

const TabList = forwardRef((
  {
    orientation = defaultOrientation,
    ...rest
  },
  ref
) => {
  const styleProps = useTabListStyle({ orientation });

  return (
    <Box
      ref={ref}
      aria-label="tabs"
      aria-orientation={orientation}
      role="tablist"
      {...styleProps}
      {...rest}
    />
  );
});

TabList.displayName = 'TabList';

export default TabList;
