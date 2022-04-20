import React, { forwardRef } from 'react';
import MenuContent from './MenuContent';
import { useMenuListStyle } from './styles';

const MenuList = forwardRef((props, ref) => {
  const styleProps = useMenuListStyle();

  return (
    <MenuContent
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

MenuList.displayName = 'MenuList';

export default MenuList;
