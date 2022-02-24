import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useTabListStyle } from './styles';

const TabList = forwardRef((
  {
    ...rest
  },
  ref
) => {
  const styleProps = useTabListStyle({});

  return (
    <Box
      ref={ref}
      aria-label="tabs"
      aria-orientation="horizontal"
      role="tablist"
      {...styleProps}
      {...rest}
    />
  );
});

TabList.displayName = 'TabList';

export default TabList;
