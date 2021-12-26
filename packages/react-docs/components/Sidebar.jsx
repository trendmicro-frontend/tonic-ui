import {
  Box,
  Text,
  useColorMode,
  useTheme,
} from '@tonic-ui/react';
import { ensureString } from 'ensure-type';
import React, { forwardRef } from 'react';
import NavLink from './NavLink';
import { routes } from '../config/sidebar-routes';

const ASSET_PREFIX = ensureString(process.env.ASSET_PREFIX);

const Sidebar = forwardRef((props, ref) => {
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
      {routes.map(({ title, routes }) => (
        <Box key={title}>
          <Text
            fontSize={headingFontSize}
            color={headingColor}
            mt="4x"
            mb="2x"
            pl="2x"
          >
            {title}
          </Text>
          {routes.map(({ title, path }) => {
            const key = title;
            const url = `${ASSET_PREFIX}/${path}`;

            return (
              <NavLink key={key} href={url}>
                {title}
              </NavLink>
            );
          })}
        </Box>
      ))}
    </Box>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
