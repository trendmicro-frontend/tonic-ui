import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useSubmenuListStyle } from './styles';
import useSubmenu from './useSubmenu';

const SubmenuList = forwardRef((props, ref) => {
  const submenuContext = useSubmenu(); // context might be an undefined value
  const { isHovered, placement, submenuId } = { ...submenuContext };
  const styleProps = useSubmenuListStyle({ isHovered, placement });

  return (
    <Box
      ref={ref}
      data-submenu-id={submenuId}
      id={submenuId}
      {...styleProps}
      {...props}
    />
  );
});

SubmenuList.displayName = 'SubmenuList';

export default SubmenuList;
