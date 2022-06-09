import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useSubMenuListStyle } from './styles';
import useSubMenu from './useSubMenu';

const SubMenuList = forwardRef((props, ref) => {
  const subMenuContext = useSubMenu(); // context might be an undefined value
  const { isHovered } = { ...subMenuContext };
  const styleProps = useSubMenuListStyle({ isHovered });

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

SubMenuList.displayName = 'SubMenuList';

export default SubMenuList;
