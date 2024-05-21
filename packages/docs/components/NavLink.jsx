import {
  Box,
  useColorMode,
} from '@trendmicro/react-styled-ui';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { forwardRef } from 'react';

const NavLink = forwardRef((
  {
    href,
    children,
    ...rest
  },
  ref
) => {
  const router = useRouter();
  const isRouteActive = href.replace('.', '') === router.pathname;
  const [colorMode] = useColorMode();
  const color = {
    light: 'gray:90', // FIXME
    dark: 'white:primary',
  }[colorMode];
  const activeBackgroundColor = {
    light: 'rgba(0, 0, 0, 0.1)', // FIXME
    dark: 'rgba(255, 255, 255, 0.1)',
  }[colorMode];
  const activeColor = {
    light: 'inherit', // FIXME
    dark: 'inherit',
  }[colorMode];
  const hoverBackgroundColor = {
    light: 'rgba(0, 0, 0, 0.12)', // FIXME
    dark: 'rgba(255, 255, 255, 0.12)',
  }[colorMode];
  const selectedBackgroundColor = {
    light: 'rgba(0, 0, 0, 0.08)', // FIXME
    dark: 'rgba(255, 255, 255, 0.08)',
  }[colorMode];

  return (
    <NextLink
      href={href}
      legacyBehavior
      passHref
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
        aria-selected={!!isRouteActive}
        _active={{
          backgroundColor: activeBackgroundColor,
          color: activeColor,
        }}
        _hover={{
          backgroundColor: hoverBackgroundColor,
        }}
        _selected={{
          backgroundColor: selectedBackgroundColor,
        }}
        {...rest}
      >
        {children}
      </Box>
    </NextLink>
  );
});

NavLink.displayName = 'NavLink';

export default NavLink;
