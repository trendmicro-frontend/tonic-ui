import { ensureString } from 'ensure-type';
import {
  Box,
  Button,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Space,
  Text,
  useColorMode,
  useColorStyle,
} from '@tonic-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { forwardRef, useEffect } from 'react';
import pkg from '../../../package.json';
import persistColorMode from '../utils/persist-color-mode';
import FontAwesomeIcon from './FontAwesomeIcon';

const ASSET_PREFIX = ensureString(process.env.ASSET_PREFIX);
const TONIC_UI_DOC_VERSION = ensureString(process.env.TONIC_UI_DOC_VERSION);

const versionMap = {
  [ensureString(process.env.TONIC_UI_V1_RELEASE_VERSION)]: {
    label: `v${ensureString(process.env.TONIC_UI_V1_RELEASE_VERSION)}`,
    url: ensureString(process.env.TONIC_UI_V1_RELEASE_DOCUMENTATION),
  },
  [ensureString(process.env.TONIC_UI_V0_RELEASE_VERSION)]: {
    label: `v${ensureString(process.env.TONIC_UI_V0_RELEASE_VERSION)}`,
    url: ensureString(process.env.TONIC_UI_V0_RELEASE_DOCUMENTATION),
  },
  'latest': {
    label: `${ensureString(process.env.TONIC_UI_DEFAULT_BRANCH)} branch`,
    url: ensureString(process.env.TONIC_UI_DEFAULT_DOCUMENTATION),
  },
};

const Header = forwardRef((
  {
    onToggle,
    ...rest
  },
  ref,
) => {
  const [colorMode, toggleColorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const router = useRouter();
  const version = (() => {
    if (TONIC_UI_DOC_VERSION) {
      return TONIC_UI_DOC_VERSION;
    }
    if (process.env.NODE_ENV === 'development') {
      return 'local build';
    }
    return '';
  })();

  useEffect(() => {
    persistColorMode(colorMode);
  }, [colorMode]);

  const logo = {
    light: 'tonic-logo-light.svg',
    dark: 'tonic-logo-dark.svg',
  }[colorMode];
  const backgroundColor = {
    light: 'white',
    dark: 'gray:90',
  }[colorMode];
  const boxShadowColor = {
    light: 'rgba(0, 0, 0, 0.12)',
    dark: 'rgba(255, 255, 255, 0.12)',
  }[colorMode];
  const fontColor = {
    light: 'black:primary',
    dark: 'white:primary',
  }[colorMode];

  const handleChooseVersion = (event) => {
    const url = event.currentTarget.getAttribute('value');
    if (url) {
      window.location = url;
    }
  };

  const handleViewAllVersions = () => {
    router.push(`${ASSET_PREFIX}/getting-started/versions`);
  };

  return (
    <Box
      as="header"
      ref={ref}
      position="fixed"
      top={0}
      zIndex="fixed"
      height="12x"
      width="100%"
      backdropFilter="blur(20px)"
      backgroundColor={backgroundColor}
      boxShadow={`0px -1px 1px inset ${boxShadowColor}`}
      transition="all 0.2s"
      {...rest}
    >
      <Box
        display="flex"
        position="relative"
        height="100%"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Box
            display={{
              sm: 'block',
              md: 'none',
            }}
          >
            <Box
              display="flex"
              flex="auto"
              mx="4x"
            >
              <Button variant="secondary" onClick={onToggle}>
                <Icon icon="menu" />
              </Button>
            </Box>
          </Box>
          <Box
            display={{
              sm: 'none',
              md: 'block',
            }}
          >
            <NextLink href={`${ASSET_PREFIX}/`} passHref>
              <Box
                as="a"
                display="flex"
                alignItems="center"
                flex="auto"
                fontSize="xl"
                maxWidth="100%"
                px="4x"
                py="2x"
                color={fontColor}
                outline="none"
                textDecoration="none"
              >
                <Image
                  alt=""
                  src={`${ASSET_PREFIX}/images/${logo}`}
                  height="8x"
                  marginRight="2x"
                />
                <Text>Tonic UI</Text>
              </Box>
            </NextLink>
          </Box>
        </Box>
        <Box
          display="flex"
          flex="none"
          width="auto"
          alignItems="center"
          columnGap="4x"
          px="4x"
        >
          <Box
            display="flex"
            flex="none"
          >
            <Menu>
              <MenuButton>
                {versionMap[version]?.label ?? version}
              </MenuButton>
              <MenuList>
                {Object.entries(versionMap).map(([key, value]) => (
                  <MenuItem
                    key={key}
                    value={value?.url}
                    whiteSpace="nowrap"
                    onClick={handleChooseVersion}
                  >
                    {(key === version)
                      ? <Text>{value?.label}<Space width="2x" />✓</Text>
                      : <Text>{value?.label}</Text>
                    }
                  </MenuItem>
                ))}
                <MenuDivider />
                <MenuItem
                  whiteSpace="nowrap"
                  onClick={handleViewAllVersions}
                >
                  <Text>View all versions</Text>
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
          <Box
            as="a"
            color={colorStyle.color.secondary}
            _hover={{
              color: colorStyle.color.primary,
              cursor: 'pointer',
            }}
            _visited={{
              color: colorStyle.color.secondary,
            }}
            onClick={toggleColorMode}
            display="inline-flex"
          >
            {colorMode === 'light' && (
              <Icon icon="moon" size={24} />
            )}
            {colorMode === 'dark' && (
              <Icon icon="sun" size={24} />
            )}
          </Box>
          <Box
            as="a"
            color={colorStyle.color.secondary}
            _hover={{
              color: colorStyle.color.primary,
              cursor: 'pointer',
            }}
            _visited={{
              color: colorStyle.color.secondary,
            }}
            href={pkg.homepage}
            target="_blank"
            display="inline-flex"
          >
            <FontAwesomeIcon
              icon={['fab', 'github']}
              style={{
                width: 24,
                height: 24,
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
});

Header.displayName = 'Header';

export default Header;
