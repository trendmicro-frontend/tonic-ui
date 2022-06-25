import React, { forwardRef } from 'react';
import Box from '../Box';
import { useTabListStyle } from './styles';
import useTabs from './useTabs';

const TabList = forwardRef((
  {
    'aria-label': ariaLabel,
    ...rest
  },
  ref
) => {
  const context = useTabs();
  const orientation = context?.orientation;
  const styleProps = useTabListStyle({ orientation });

  return (
    <Box
      ref={ref}
      aria-label={ariaLabel}
      aria-orientation={orientation}
      role="tablist"
      {...styleProps}
      {...rest}
    />
  );
});

TabList.displayName = 'TabList';

export default TabList;
