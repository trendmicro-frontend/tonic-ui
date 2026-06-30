import {
  Box,
  Button,
  ButtonBase,
  Flex,
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
  usePortalManager,
} from '@tonic-ui/react';
import {
  MenuIcon,
  MoonIcon,
  SunIcon,
} from '@tonic-ui/react-icons';
import { ensureString } from 'ensure-type';
import NextLink from 'next/link';
import { forwardRef, useCallback, useEffect } from 'react';
import useTrack from '../hooks/useTrack';
import GitHubIcon from '../icons/GitHubIcon';
import persistColorMode from '../utils/persist-color-mode';
import SearchButton from './SearchButton';
import InstantSearchModal from './InstantSearchModal';

const BASE_PATH = ensureString(process.env.TONIC_UI_REACT_DOCS_BASE_PATH);

const GITHUB_REPO_URL = 'https://adc.github.trendmicro.com/trend-common-platform/tonic-ui';

const TONIC_UI_REACT_DOCS_URL = ensureString(process.env.TONIC_UI_REACT_DOCS_URL);

// The TONIC_UI_REACT_DOCS_VERSION environment variable might be one of: latest, pr-<number>, or version (e.g. 0.1.0) for a tag release
const TONIC_UI_REACT_DOCS_VERSION = ensureString(process.env.TONIC_UI_REACT_DOCS_VERSION);

// Available version labels from environment (e.g., "v3 v4")
const TONIC_UI_VERSION_LABELS = ensureString(process.env.TONIC_UI_VERSION_LABELS);

// Build version map from labels
const versionMap = Object.fromEntries(
  ensureString(TONIC_UI_VERSION_LABELS).split(/\s+/).map(versionLabel => [
    versionLabel,
    {
      label: versionLabel,
      url: `${TONIC_UI_REACT_DOCS_URL}/${versionLabel}/getting-started`,
    },
  ])
);

const Header = forwardRef((
  {
    onToggle,
    onColorModeChange,
    ...rest
  },
  ref,
) => {
  const [colorMode, toggleColorMode] = useColorMode();
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

  useEffect(() => {
    persistColorMode(colorMode);
  }, [colorMode]);

  const logo = {
    light: 'tonic-logo-light.svg',
    dark: 'tonic-logo-dark.svg',
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
      backgroundColor="background.high"
      borderBottom={1}
      borderBottomColor="border.subtle"
      boxShadow="down.medium"
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
                <MenuIcon />
              </Button>
            </Box>
          </Box>
          <Box
            display={{
              sm: 'none',
              lg: 'block',
            }}
          >
            <NextLink href="/" legacyBehavior passHref>
              { }
              <Link
                data-track="Header|click_landing_page"
                color="text.primary"
                fontSize="xl"
                lineHeight="lg"
                outline="none"
                px="4x"
                py="2x"
                textDecoration="none"
                _active={{
                  color: 'text.accent',
                }}
                _hover={{
                  color: 'text.accent',
                }}
                _visited={{
                  color: 'text.primary',
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
                      : value?.label}
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
            data-track={`Header|click_toggle_color_mode|${colorMode === 'light' ? 'dark' : 'light'}`}
            onClick={() => toggleColorMode()}
            title="Toggle color mode"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'text.secondary',
              width: '8x',
              height: '8x',
              _hover: {
                color: 'text.primary',
                cursor: 'pointer',
              },
              _focusVisible: {
                outlineColor: '_component.keyboardFocused.outerFocusRing',
                outlineStyle: 'solid',
                outlineWidth: '1h',
              },
            }}
          >
            {colorMode === 'light' && (
              <MoonIcon size="6x" />
            )}
            {colorMode === 'dark' && (
              <SunIcon size="6x" />
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
              color: 'text.secondary',
              width: '8x',
              height: '8x',
              _hover: {
                color: 'text.primary',
                cursor: 'pointer',
              },
              _focusVisible: {
                outlineColor: '_component.keyboardFocused.outerFocusRing',
                outlineStyle: 'solid',
                outlineWidth: '1h',
              },
            }}
          >
            <GitHubIcon size="6x" />
          </ButtonBase>
        </Box>
      </Box>
    </Box>
  );
});

Header.displayName = 'Header';

export default Header;
