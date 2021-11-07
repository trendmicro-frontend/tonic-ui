import React, { forwardRef } from 'react';
import Box from '../Box';
import { useMenuGroupStyle } from './styles';

const MenuGroup = forwardRef(({ children, title, ...rest }, ref) => {
  const styleProps = useMenuGroupStyle();

  return (
    <>
      <Box
        ref={ref}
        role="group"
        {...styleProps}
      >
        {title}
      </Box>
      {children}
    </>
  );
});

MenuGroup.displayName = 'MenuGroup';

export default MenuGroup;
