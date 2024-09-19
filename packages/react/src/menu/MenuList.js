import React, { forwardRef } from 'react';
import { useDefaultProps } from '../default-props';
import MenuContent from './MenuContent';
import { useMenuListStyle } from './styles';

const MenuList = forwardRef((inProps, ref) => {
  const props = useDefaultProps({ props: inProps, name: 'MenuList' });
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
