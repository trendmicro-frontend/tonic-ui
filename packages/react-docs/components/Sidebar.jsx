import {
  Box,
  Icon,
  Space,
  Text,
  useColorMode,
  useColorStyle,
} from '@tonic-ui/react';
import { ensureString } from 'ensure-type';
import React, { forwardRef } from 'react';
import NavLink from './NavLink';
import { routes } from '../config/sidebar-routes';

const ASSET_PREFIX = ensureString(process.env.ASSET_PREFIX);

const Sidebar = forwardRef((
  {
    onClick,
    ...rest
  },
  ref,
) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const backgroundColor = {
    light: 'white',
    dark: 'gray:90',
  }[colorMode];
  const borderColor = {
    light: 'gray:20',
    dark: 'gray:70',
  }[colorMode];
  const headingColor = {
    light: 'black:secondary',
    dark: 'white:secondary',
  }[colorMode];

  return (
    <Box
      as="nav"
      ref={ref}
      backgroundColor={backgroundColor}
      borderRight={1}
      borderRightColor={borderColor}
      py="4x"
      {...rest}
    >
      {routes.map(({ title, icon, routes }) => (
        <Box
          key={title}
          mb="4x"
          whiteSpace="nowrap"
        >
          <Box
            display="inline-flex"
            alignItems="center"
            px="3x"
            mb="2x"
          >
            <Icon
              icon={icon}
              color={colorStyle?.color?.tertiary}
              size="4x"
            />
            <Space width="2x" />
            <Text
              color={headingColor}
              fontSize="md"
              lineHeight="md"
              textTransform="uppercase"
            >
              {title}
            </Text>
          </Box>
          <Box>
            {routes.map(({ title, path }) => {
              const key = title;
              const url = `${ASSET_PREFIX}/${path}`;

              return (
                <NavLink
                  key={key}
                  href={url}
                  onClick={onClick}
                >
                  <Text
                    fontSize="md"
                    lineHeight="md"
                    ml="5x"
                  >
                    {title}
                  </Text>
                </NavLink>
              );
            })}
          </Box>
        </Box>
      ))}
    </Box>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
