import {
  Box,
  Heading,
  PseudoBox,
  useColorMode,
  useTheme,
} from '@trendmicro/react-styled-ui';
import NextLink from 'next/link';
import React from 'react';
import {
  themeLinks,
  buildingBlockLinks,
  componentLinks,
  hookLinks,
} from './nav-links';

const NavLink = React.forwardRef(({ href, children, ...rest }, ref) => {
  const { colorMode } = useColorMode();
  const color = {
    light: 'gray:90', // FIXME
    dark: 'white', // FIXME
  }[colorMode];
  const activeBackgroundColor = {
    light: 'inherit', // FIXME
    dark: 'inherit', // FIXME
  }[colorMode];
  const activeColor = {
    light: 'inherit', // FIXME
    dark: 'inherit', // FIXME
  }[colorMode];
  const hoverColor = {
    light: 'inherit', // FIXME
    dark: 'inherit', // FIXME
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
        p="2x"
        textDecoration="none"
        _active={{
          backgroundColor: activeBackgroundColor,
          color: activeColor,
        }}
        _hover={{
          color: hoverColor,
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
  const { colorMode } = useColorMode();
  const backgroundColor = {
    light: 'white', // FIXME
    dark: 'gray:90', // FIXME
  }[colorMode];
  const borderColor = {
    light: 'gray:20', // FIXME
    dark: 'gray:70', // FIXME
  }[colorMode];
  const headingColor = {
    light: 'black:tertiary',
    dark: 'white:tertiary',
  }[colorMode];
  const top = theme.sizes['16x'];
  const height = `calc(100vh - ${top})`;

  return (
    <PseudoBox
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
        <NavLink href="getting-started">
          Getting Started
        </NavLink>
        <NavLink href="color-modes">
          Color Modes
        </NavLink>
        <NavLink href="contributing">
          Contributing
        </NavLink>
      </Box>
      <Box>
        <Heading
          fontSize="md"
          color={headingColor}
          mt="4x"
          mb="2x"
          pl="2x"
        >
          THEME
        </Heading>
        {themeLinks.map(link => {
          const url = `./${link.toLowerCase().split(' ').join('-')}`;

          return (
            <NavLink key={link} href={url}>
              {link}
            </NavLink>
          );
        })}
      </Box>
      <Box>
        <Heading
          fontSize="md"
          color={headingColor}
          mt="4x"
          mb="2x"
          pl="2x"
        >
          BUILDING BLOCKS
        </Heading>
        {buildingBlockLinks.map(link => {
          const url = `./${link.toLowerCase().split(' ').join('-')}`;

          return (
            <NavLink key={link} href={url}>
              {link}
            </NavLink>
          );
        })}
      </Box>
      <Box>
        <Heading
          fontSize="md"
          color={headingColor}
          mt="4x"
          mb="2x"
          pl="2x"
        >
          COMPONENTS
        </Heading>
        {componentLinks.map(link => {
          const url = `./${link.toLowerCase().split(' ').join('-')}`;

          return (
            <NavLink key={link} href={url}>
              {link}
            </NavLink>
          );
        })}
      </Box>
      <Box>
        <Heading
          fontSize="md"
          color={headingColor}
          mt="4x"
          mb="2x"
          pl="2x"
        >
          HOOKS
        </Heading>
        {hookLinks.map(link => {
          const url = `./${link.toLowerCase().split(' ').join('-')}`;

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
