import {
  Box,
  Button,
  ButtonBase,
  Flex,
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
import CodeSandboxIcon from '../icons/codesandbox';
import { open as openInCodeSandbox } from '../sandbox/codesandbox';
import persistColorMode from '../utils/persist-color-mode';
import SearchButton from './SearchButton';
import InstantSearchModal from './InstantSearchModal';
import FontAwesomeIcon from './FontAwesomeIcon';

const BASE_PATH = ensureString(process.env.BASE_PATH);

const GITHUB_REPO_URL = 'https://github.com/trendmicro-frontend/tonic-ui';

const TONIC_UI_REACT_DOCS_ROOT = ensureString(process.env.TONIC_UI_REACT_DOCS_ROOT);

// The TONIC_UI_REACT_DOCS_VERSION environment variable might be one of: latest, pr-<number>, or version (e.g. 0.1.0) for a tag release
const TONIC_UI_REACT_DOCS_VERSION = ensureString(process.env.TONIC_UI_REACT_DOCS_VERSION);

const versionMap = {
  'v2': {
    label: 'v2',
    url: `${TONIC_UI_REACT_DOCS_ROOT}/v2`,
  },
  'v1': {
    label: 'v1',
    url: `${TONIC_UI_REACT_DOCS_ROOT}/v1`,
  },
  'v0': {
    label: 'v0',
    url: `${TONIC_UI_REACT_DOCS_ROOT}/v0`,
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
  const portal = usePortalManager();
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
    portal((close) => {
      const onClose = () => {
        track('InstantSearch', 'close_instant_search_modal');

        // close the modal
        close();
      };

      return (
        <InstantSearchModal onClose={onClose} />
      );
    });
  }, [portal, track]);

  const handleClickOpenInCodeSandbox = () => {
    openInCodeSandbox({
      title: 'Tonic UI',
    });
  };

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
  const focusVisibleOutlineColor = {
    dark: 'blue:60',
    light: 'blue:60',
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
              lg: 'none',
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
              lg: 'block',
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
                <Flex alignItems="center" columnGap="2x">
                  <Image
                    alt=""
                    src={`${BASE_PATH}/images/${logo}`}
                    height="8x"
                  />
                  <Text>Tonic UI</Text>
                  <sup>{TONIC_UI_REACT_DOCS_VERSION}</sup>
                </Flex>
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
              <MenuButton
                variant="secondary"
                minWidth={100}
              >
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
          <ButtonBase
            data-track={`Header|click_codesandbox`}
            onClick={() => handleClickOpenInCodeSandbox()}
            title="Open in CodeSandbox"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: colorStyle.color.secondary,
              width: '8x',
              height: '8x',
              _hover: {
                color: colorStyle.color.primary,
                cursor: 'pointer',
              },
              _focusVisible: {
                outlineColor: focusVisibleOutlineColor,
                outlineStyle: 'solid',
                outlineWidth: '1h',
              },
            }}
          >
            <CodeSandboxIcon size={24} />
          </ButtonBase>
          <ButtonBase
            data-track={`Header|click_toggle_color_mode|${colorMode === 'light' ? 'dark' : 'light'}`}
            onClick={() => toggleColorMode()}
            title="Toggle color mode"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: colorStyle.color.secondary,
              width: '8x',
              height: '8x',
              _hover: {
                color: colorStyle.color.primary,
                cursor: 'pointer',
              },
              _focusVisible: {
                outlineColor: focusVisibleOutlineColor,
                outlineStyle: 'solid',
                outlineWidth: '1h',
              },
            }}
          >
            {colorMode === 'light' && (
              <Icon icon="moon" size={24} />
            )}
            {colorMode === 'dark' && (
              <Icon icon="sun" size={24} />
            )}
          </ButtonBase>
          <ButtonBase
            data-track={`Header|click_github_repo_url|${GITHUB_REPO_URL}`}
            onClick={() => window.open(GITHUB_REPO_URL, '_blank')}
            title="GitHub repository"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: colorStyle.color.secondary,
              width: '8x',
              height: '8x',
              _hover: {
                color: colorStyle.color.primary,
                cursor: 'pointer',
              },
              _focusVisible: {
                outlineColor: focusVisibleOutlineColor,
                outlineStyle: 'solid',
                outlineWidth: '1h',
              },
            }}
          >
            <FontAwesomeIcon
              icon={['fab', 'github']}
              style={{
                width: 24,
                height: 24,
              }}
            />
          </ButtonBase>
        </Box>
      </Box>
    </Box>
  );
});

Header.displayName = 'Header';

export default Header;
