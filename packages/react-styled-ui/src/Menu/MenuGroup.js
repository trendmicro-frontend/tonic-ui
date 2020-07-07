import React, { forwardRef } from 'react';
import Box from '../Box';
import { useMenuGroupStyle } from './styles';
import { MenuGroupContextProvider } from './context';

const MenuGroup = forwardRef(({ children, title, ...rest }, ref) => {
  const styleProps = useMenuGroupStyle();

  return (
    <>
      <Box
        as="li"
        ref={ref}
        role="group"
        {...styleProps}
      >
        {title && title}
      </Box>
      <MenuGroupContextProvider value={{ isMenuGrouped: true }}>
        {children}
      </MenuGroupContextProvider>
    </>
  );
});

export default MenuGroup;
