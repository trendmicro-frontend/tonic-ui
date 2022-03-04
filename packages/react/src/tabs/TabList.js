import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useTabListStyle } from './styles';

const TabList = forwardRef((
  {
    'aria-label': ariaLabel,
    ...rest
  },
  ref
) => {
  const styleProps = useTabListStyle({});

  return (
    <Box
      ref={ref}
      aria-label={ariaLabel}
      aria-orientation="horizontal"
      role="tablist"
      {...styleProps}
      {...rest}
    />
  );
});

TabList.displayName = 'TabList';

export default TabList;
