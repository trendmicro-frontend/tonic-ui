import { ensureString } from 'ensure-type';
import {
  Box,
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
} from '@trendmicro/react-styled-ui';
import { useRouter } from 'next/router';
import React, { forwardRef } from 'react';
import FontAwesomeIcon from './FontAwesomeIcon';
import pkg from '../../../package.json';

const ASSET_PREFIX = ensureString(process.env.ASSET_PREFIX);
const TONIC_UI_DOC_VERSION = ensureString(process.env.TONIC_UI_DOC_VERSION);

const versionMap = {
  [ensureString(process.env.TONIC_UI_V0_RELEASE_VERSION)]: {
    label: `v${ensureString(process.env.TONIC_UI_V0_RELEASE_VERSION)}`,
    url: ensureString(process.env.TONIC_UI_V0_RELEASE_DOCUMENTATION),
  },
  'latest': {
    label: 'master branch',
    url: ensureString(process.env.TONIC_UI_MASTER_BRANCH_DOCUMENTATION),
  },
};

const Header = forwardRef((props, ref) => {
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
  const [colorMode, setColorMode] = useColorMode();
  const toggleColorMode = () => {
    const nextColorMode = {
      'dark': 'light',
      'light': 'dark',
    }[colorMode];
    setColorMode(nextColorMode);
  };
  const logoPath = {
    light: 'images/tonic-logo-light.svg',
    dark: 'images/tonic-logo-dark.svg',
  }[colorMode];
  const backgroundColor = {
    light: 'white:emphasis', // FIXME
    dark: 'gray:90',
  }[colorMode];
  const borderColor = {
    light: 'gray:20', // FIXME
    dark: 'gray:70',
  }[colorMode];
  const fontColor = {
    light: 'black:primary', // FIXME
    dark: 'white:emphasis',
  }[colorMode];
  const handleChooseVersion = (event) => {
    const url = event.currentTarget.getAttribute('value');
    if (url) {
      window.location = url;
    }
  };
  const handleViewAllVersions = () => {
    router.push(`${ASSET_PREFIX}/versions`);
  };

  return (
    <Box
      ref={ref}
      position="fixed"
      top={0}
      height="12x"
      width="100%"
      zIndex="fixed"
      backgroundColor={backgroundColor}
      borderBottom={1}
      borderBottomColor={borderColor}
      {...props}
    >
      <Box
        display="flex"
        position="relative"
        height="100%"
        alignItems="center"
      >
        <Box
          display="flex"
          alignItems="center"
          flex="auto"
          fontSize="xl"
          maxWidth="100%"
          px="4x"
          py="2x"
          color={fontColor}
        >
          <Image
            alt=""
            src={logoPath}
            width={35}
            height={30}
            marginRight="2x"
          />
          <Text>Tonic UI</Text>
        </Box>
        {version && (
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
                      ? <><Text>{value?.label}</Text><Space width="2x" /><Text>✓</Text></>
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
        )}
        <Box
          display="flex"
          flex="none"
          width="auto"
          align="center"
          px="4x"
        >
          <Box
            as="a"
            _hover={{
              cursor: 'pointer',
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
            display="inline-block"
            width="5x"
          />
          <Box
            as="a"
            _hover={{
              cursor: 'pointer',
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
