import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { useTabListStyle } from './styles';
import useTabs from './useTabs';

const TabList = forwardRef((inProps, ref) => {
  const {
    'aria-label': ariaLabel,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'TabList' });
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
