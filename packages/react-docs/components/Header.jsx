import {
  Box,
  Button,
  Icon,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Space,
  Text,
  useColorMode,
  useColorStyle,
  usePortalManager,
} from '@tonic-ui/react';
import { ensureString } from 'ensure-type';
import NextLink from 'next/link';
import React, { forwardRef, useCallback, useEffect } from 'react';
import useTrack from '../hooks/useTrack';
import persistColorMode from '../utils/persist-color-mode';
import SearchButton from './SearchButton';
import InstantSearchModal from './InstantSearchModal';
import FontAwesomeIcon from './FontAwesomeIcon';

const BASE_PATH = ensureString(process.env.BASE_PATH);

const GITHUB_REPO_URL = 'https://github.com/trendmicro-frontend/tonic-ui';

// The TONIC_UI_REACT_DOCS_VERSION environment variable might be one of: latest, pr-<number>, or version (e.g. 0.1.0) for a tag release
const TONIC_UI_REACT_DOCS_VERSION = ensureString(process.env.TONIC_UI_REACT_DOCS_VERSION);

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
  const portalManager = usePortalManager();
  const track = useTrack();

  const version = (() => {
    if (TONIC_UI_REACT_DOCS_VERSION) {
      return TONIC_UI_REACT_DOCS_VERSION;
    }
    if (process.env.NODE_ENV === 'development') {
      return 'local build';
    }
    return '';
  })();

  const openInstantSearchModal = useCallback(() => {
    portalManager.add((close) => {
      const onClose = () => {
        track('InstantSearch', 'close_instant_search_modal');

        // close the modal
        close();
      };

      return (
        <InstantSearchModal onClose={onClose} />
      );
    });
  }, [portalManager]);

  useEffect(() => {
    persistColorMode(colorMode);
  }, [colorMode]);

  const logo = {
    light: 'tonic-logo-light.svg',
    dark: 'tonic-logo-dark.svg',
  }[colorMode];
  const boxShadowColor = {
    light: 'rgba(0, 0, 0, 0.12)',
    dark: 'rgba(255, 255, 255, 0.12)',
  }[colorMode];

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
      backgroundColor={colorStyle.background.primary}
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
            <NextLink href={`/`} legacyBehavior passHref>
              <Link
                data-track="Header|click_landing_page"
                color={colorStyle.color.primary}
                fontSize="xl"
                lineHeight="lg"
                outline="none"
                px="4x"
                py="2x"
                textDecoration="none"
                _active={{
                  color: colorStyle.color.emphasis,
                }}
                _hover={{
                  color: colorStyle.color.emphasis,
                }}
                _visited={{
                  color: colorStyle.color.primary,
                }}
              >
                <Image
                  alt=""
                  src={`${BASE_PATH}/images/${logo}`}
                  height="8x"
                  marginRight="2x"
              />
                <Text>Tonic UI</Text>
              </Link>
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
          <SearchButton
            data-track="InstantSearch|open_instant_search_modal"
            onClick={openInstantSearchModal}
          >
            Search...
          </SearchButton>
          <Box
            display="flex"
            flex="none"
          >
            <Menu
              onOpen={() => {
                track('Header', 'open_version_menu');
              }}
              onClose={() => {
                track('Header', 'close_version_menu');
              }}
            >
              <MenuButton>
                {versionMap[version]?.label ?? version}
              </MenuButton>
              <MenuList>
                {Object.entries(versionMap).map(([key, value]) => (
                  <MenuItem
                    data-track={`Header|click_version_menu_item|${value?.label}`}
                    key={key}
                    as="a"
                    href={value?.url}
                    whiteSpace="nowrap"
                  >
                    {(key === version)
                      ? <>{value?.label}<Space width="2x" />✓</>
                      : value?.label
                    }
                  </MenuItem>
                ))}
                <MenuDivider />
                <MenuItem
                  data-track="Header|click_version_menu_item|View all versions"
                  as="a"
                  href={`${BASE_PATH}/getting-started/versions`}
                  whiteSpace="nowrap"
                >
                  View all versions
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
          <Box
            data-track={`Header|click_toggle_color_mode|${colorMode === 'light' ? 'dark' : 'light'}`}
            as="a"
            color={colorStyle.color.secondary}
            _hover={{
              color: colorStyle.color.primary,
              cursor: 'pointer',
            }}
            _visited={{
              color: colorStyle.color.secondary,
            }}
            onClick={() => toggleColorMode()}
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
            data-track={`Header|click_github_repo_url|${GITHUB_REPO_URL}`}
            as="a"
            href={GITHUB_REPO_URL}
            target="_blank"
            color={colorStyle.color.secondary}
            display="inline-flex"
            _hover={{
              color: colorStyle.color.primary,
              cursor: 'pointer',
            }}
            _visited={{
              color: colorStyle.color.secondary,
            }}
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
