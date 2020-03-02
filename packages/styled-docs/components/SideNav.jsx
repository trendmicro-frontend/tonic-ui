import { Box, Heading, PseudoBox, useColorMode } from '@trendmicro/react-styled-core';
import Link from 'next/link';
import React from 'react';
import components from '../shared/components';

const NavLink = React.forwardRef(({ children, ...props }, ref) => {
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
    <Link passHref {...props}>
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
      >
        {children}
      </PseudoBox>
    </Link>
  );
});

const SideNav = React.forwardRef((props, ref) => {
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

  return (
    <Box
      position="fixed"
      top="16x"
      left={0}
      width="100%"
      height="100%"
      backgroundColor={backgroundColor}
      borderRight={1}
      borderRightColor={borderColor}
      overflowY="auto"
      {...props}
    >
      <Box
        position="relative"
        height="100%"
      >
        <Box mb="8x">
          <NavLink href="getting-started">
            Getting Started
          </NavLink>
          <NavLink href="color-mode">
            Color Mode
          </NavLink>
          <NavLink href="theme">
            Theme
          </NavLink>
          <NavLink href="contributing">
            Contributing
          </NavLink>
        </Box>
        <Box mb="8x">
          <Heading
            fontSize="md"
            color={headingColor}
            mb="2x"
            pl="2x"
          >
            COMPONENTS
          </Heading>
          {components.map(component => {
            const url = `./${component.toLowerCase().split(' ').join('-')}`;

            return (
              <NavLink key={component} href={url}>
                {component}
              </NavLink>
            );
          })}
        </Box>
        <Box mb="calc(2rem + 4rem)">
          <Heading
            fontSize="md"
            color={headingColor}
            mb="2x"
            pl="2x"
          >
            OTHERS
          </Heading>
          <NavLink href="usecolormode">
            useColorMode
          </NavLink>
          <NavLink href="usetheme">
            useTheme
          </NavLink>
          <NavLink href="withcolormode">
            withColorMode
          </NavLink>
        </Box>
      </Box>
    </Box>
  );
});

export default SideNav;
