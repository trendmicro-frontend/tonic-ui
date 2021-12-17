import {
  Box,
  Text,
  useColorMode,
  useTheme,
} from '@tonic-ui/react';
import { ensureString } from 'ensure-type';
import React, { forwardRef } from 'react';
import NavLink from './NavLink';
import {
  themeLinks,
  buildingBlockLinks,
  componentLinks,
  utilityLinks,
} from './nav-links';

const ASSET_PREFIX = ensureString(process.env.ASSET_PREFIX);

const SideNav = forwardRef((props, ref) => {
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
    <Box
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
        <NavLink href={`${ASSET_PREFIX}/getting-started`}>
          Getting Started
        </NavLink>
        <NavLink href={`${ASSET_PREFIX}/color-mode`}>
          Color Mode
        </NavLink>
        <NavLink href={`${ASSET_PREFIX}/color-style`}>
          Color Style
        </NavLink>
        <NavLink href={`${ASSET_PREFIX}/versions`}>
          Versions
        </NavLink>
        <NavLink href={`${ASSET_PREFIX}/contributing`}>
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
          const url = `${ASSET_PREFIX}/${link.toLowerCase().split(' ').join('-')}`;

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
          const url = `${ASSET_PREFIX}/${link.toLowerCase().split(' ').join('-')}`;

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
          const url = `${ASSET_PREFIX}/${link.toLowerCase().split(' ').join('-')}`;

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
          const url = `${ASSET_PREFIX}/${link.toLowerCase().split(' ').join('-')}`;

          return (
            <NavLink key={link} href={url}>
              {link}
            </NavLink>
          );
        })}
      </Box>
    </Box>
  );
});

SideNav.displayName = 'SideNav';

export default SideNav;
