import {
  Box,
  Icon,
  Image,
  Space,
  Text,
  useColorMode,
  useColorStyle,
} from '@tonic-ui/react';
import { ensureString } from 'ensure-type';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { forwardRef } from 'react';
import NavLink from './NavLink';
import { routes } from '../config/sidebar-routes';

const ASSET_PREFIX = ensureString(process.env.ASSET_PREFIX);

const Sidebar = forwardRef((
  {
    isDesktopMode, // eslint-disable-line no-unused-vars
    isMobileMode,
    onClick,
    ...rest
  },
  ref,
) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const router = useRouter();
  const backgroundColor = {
    light: 'white',
    dark: 'gray:90',
  }[colorMode];
  const borderColor = {
    light: 'gray:20',
    dark: 'gray:70',
  }[colorMode];
  const fontColor = {
    light: 'black:primary',
    dark: 'white:primary',
  }[colorMode];
  const logo = {
    light: 'tonic-logo-light.svg',
    dark: 'tonic-logo-dark.svg',
  }[colorMode];

  return (
    <Box
      as="nav"
      ref={ref}
      backgroundColor={backgroundColor}
      borderRight={1}
      borderRightColor={borderColor}
      pt={isMobileMode ? 0 : '4x'}
      pb="4x"
      {...rest}
    >
      {isMobileMode && (
        <NextLink
          href={`${ASSET_PREFIX}/`}
          passHref
        >
          <Box
            as="a"
            display="flex"
            alignItems="center"
            flex="auto"
            fontSize="xl"
            maxWidth="100%"
            px="4x"
            mt="4x"
            mb="6x"
            color={fontColor}
            outline="none"
            textDecoration="none"
            whiteSpace="nowrap"
          >
            <Image
              alt=""
              src={`${ASSET_PREFIX}/images/${logo}`}
              width={35}
              height={30}
              marginRight="2x"
          />
            <Text>Tonic UI</Text>
          </Box>
        </NextLink>
      )}
      {routes.map(({ title, icon, path, routes }) => {
        const pathname = `${ASSET_PREFIX}/${path}`;
        const key = pathname;

        return (
          <Box
            key={key}
            mb="4x"
            whiteSpace="nowrap"
          >
            <Box
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
                color={colorStyle?.color?.primary}
                fontSize="sm"
                lineHeight="sm"
              >
                {title}
              </Text>
            </Box>
            {routes.map(({ title, heading, path }) => {
              if (heading) {
                const key = title;

                return (
                  <Text
                    key={title}
                    color={colorStyle?.color?.tertiary}
                    fontSize="xs"
                    lineHeight="xs"
                    pl="9x"
                    mt="4x"
                    mb="2x"
                    textTransform="uppercase"
                    letterSpacing="0.08rem"
                    _firstOfType={{
                      mt: 0,
                    }}
                  >
                    {title}
                  </Text>
                );
              }

              const pathname = heading ? title : `${ASSET_PREFIX}/${path}`;
              const key = pathname;
              const isActive = ensureString(router.pathname).startsWith(pathname);

              return (
                <NavLink
                  key={key}
                  isActive={isActive}
                  href={pathname}
                  onClick={onClick}
                  px={0}
                >
                  <Text
                    fontSize="sm"
                    lineHeight="sm"
                    pl="9x"
                  >
                    {title}
                  </Text>
                </NavLink>
              );
            })}
          </Box>
        );
      })}
    </Box>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
