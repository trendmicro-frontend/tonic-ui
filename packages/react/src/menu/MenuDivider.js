import React, { forwardRef } from 'react';
import { Divider } from '../divider';
import { useMenuItemDividerStyle } from './styles';

const MenuDivider = forwardRef((props, ref) => {
  const styleProps = useMenuItemDividerStyle();

  return (
    <Divider
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

MenuDivider.displayName = 'MenuDivider';

export default MenuDivider;
