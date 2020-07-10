import React, { forwardRef } from 'react';
import Box from '../Box';
import { useMenuGroupStyle } from './styles';
import { MenuGroupContextProvider } from './context';

const MenuGroup = forwardRef(({ children, title, ...rest }, ref) => {
  const styleProps = useMenuGroupStyle();

  return (
    <>
      <Box
        ref={ref}
        role="group"
        {...styleProps}
      >
        {title && title}
      </Box>
      <MenuGroupContextProvider value={{}}>
        {children}
      </MenuGroupContextProvider>
    </>
  );
});

MenuGroup.displayName = 'MenuGroup';

export default MenuGroup;
