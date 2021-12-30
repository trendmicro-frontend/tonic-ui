import {
  Box,
  useColorMode,
  useColorStyle,
} from '@tonic-ui/react';
import NextLink from 'next/link';
import React, { forwardRef } from 'react';

const NavLink = forwardRef((
  {
    href,
    isActive,
    ...rest
  },
  ref
) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const color = colorStyle.color.secondary;
  const activeBackgroundColor = {
    light: 'rgba(0, 0, 0, 0.1)',
    dark: 'rgba(255, 255, 255, 0.1)',
  }[colorMode];
  const activeColor = colorStyle.color.primary;
  const hoverBackgroundColor = {
    light: 'rgba(0, 0, 0, 0.12)',
    dark: 'rgba(255, 255, 255, 0.12)',
  }[colorMode];
  const selectedBackgroundColor = {
    light: 'rgba(0, 0, 0, 0.08)',
    dark: 'rgba(255, 255, 255, 0.08)',
  }[colorMode];
  const selectedColor = colorStyle.color.emphasis;

  return (
    <NextLink
      passHref
      href={href}
    >
      <Box
        ref={ref}
        as="a"
        color={color}
        display="flex"
        px="4x"
        py="2x"
        fontSize="sm"
        textDecoration="none"
        aria-selected={!!isActive}
        _active={{
          backgroundColor: activeBackgroundColor,
          color: activeColor,
        }}
        _hover={{
          backgroundColor: hoverBackgroundColor,
        }}
        _selected={{
          backgroundColor: selectedBackgroundColor,
          color: selectedColor,
        }}
        {...rest}
      />
    </NextLink>
  );
});

NavLink.displayName = 'NavLink';

export default NavLink;
