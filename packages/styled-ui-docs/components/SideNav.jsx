import {
  Box,
  PseudoBox,
  Text,
  useColorMode,
  useTheme,
} from '@trendmicro/react-styled-ui';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import {
  themeLinks,
  buildingBlockLinks,
  componentLinks,
  utilityLinks,
} from './nav-links';

const publicUrl = process.env.PUBLIC_URL;

const NavLink = React.forwardRef(({ href, children, ...rest }, ref) => {
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
      passHref
      href={href}
    >
      <PseudoBox
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
      </PseudoBox>
    </NextLink>
  );
});

const SideNav = React.forwardRef((props, ref) => {
  const theme = useTheme();
  const [colorMode] = useColorMode();
  const backgroundColor = {
    light: 'white',
    dark: 'gray:90',
  }[colorMode];
  const borderColor = {
    light: 'gray:20', // FIXME
    dark: 'gray:70', // FIXME
  }[colorMode];
  const headingColor = {
    light: 'black:secondary',
    dark: 'white:secondary',
  }[colorMode];
  const headingFontSize = 'xs';
  const top = theme.sizes['12x'];
  const height = `calc(100vh - ${top})`;

  return (
    <PseudoBox
      ref={ref}
      position="fixed"
      top={top}
      left={0}
      width="100%"
      height={height}
      backgroundColor={backgroundColor}
      borderRight={1}
      borderRightColor={borderColor}
      overflowY="auto"
      {...props}
    >
      <Box>
        <NavLink href={`${publicUrl}/getting-started`}>
          Getting Started
        </NavLink>
        <NavLink href={`${publicUrl}/color-mode`}>
          Color Mode
        </NavLink>
        <NavLink href={`${publicUrl}/color-style`}>
          Color Style
        </NavLink>
        <NavLink href={`${publicUrl}/contributing`}>
          Contributing
        </NavLink>
      </Box>
      <Box>
        <Text
          fontSize={headingFontSize}
          color={headingColor}
          mt="4x"
          mb="2x"
          pl="2x"
        >
          THEME
        </Text>
        {themeLinks.map(link => {
          const url = `${publicUrl}/${link.toLowerCase().split(' ').join('-')}`;

          return (
            <NavLink key={link} href={url}>
              {link}
            </NavLink>
          );
        })}
      </Box>
      <Box>
        <Text
          fontSize={headingFontSize}
          color={headingColor}
          mt="4x"
          mb="2x"
          pl="2x"
        >
          BUILDING BLOCKS
        </Text>
        {buildingBlockLinks.map(link => {
          const url = `${publicUrl}/${link.toLowerCase().split(' ').join('-')}`;

          return (
            <NavLink key={link} href={url}>
              {link}
            </NavLink>
          );
        })}
      </Box>
      <Box>
        <Text
          fontSize={headingFontSize}
          color={headingColor}
          mt="4x"
          mb="2x"
          pl="2x"
        >
          COMPONENTS
        </Text>
        {componentLinks.map(link => {
          const url = `${publicUrl}/${link.toLowerCase().split(' ').join('-')}`;

          return (
            <NavLink key={link} href={url}>
              {link}
            </NavLink>
          );
        })}
      </Box>
      <Box>
        <Text
          fontSize={headingFontSize}
          color={headingColor}
          mt="4x"
          mb="2x"
          pl="2x"
        >
          UTILITIES
        </Text>
        {utilityLinks.map(link => {
          const url = `${publicUrl}/${link.toLowerCase().split(' ').join('-')}`;

          return (
            <NavLink key={link} href={url}>
              {link}
            </NavLink>
          );
        })}
      </Box>
    </PseudoBox>
  );
});

export default SideNav;
