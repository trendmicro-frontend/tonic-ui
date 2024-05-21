import {
  Box,
  ButtonBase,
  Flex,
  Menu,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  MenuToggle,
  Space,
  Text,
  useColorMode,
  useColorStyle,
} from '@tonic-ui/react';

import {
  ArrowLeftIcon,
  CheckIcon,
  ChevronRightIcon,
  ColorIcon,
  LockIcon,
  SettingsIcon,
  UserTeamIcon,
} from '@tonic-ui/react-icons';

import React, { useState } from 'react';
import FocusLock from 'react-focus-lock';

const Avatar = (props) => (
  <Flex
    p="1x"
    borderRadius="50%"
    alignItems="center"
    justifyContent="center"
    fontSize="xs"
    lineHeight="1"
    {...props}
  />
);

const IconButton = (props) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  return (
    <ButtonBase
      color={colorStyle.color.secondary}
      tabIndex={0}
      _disabled={{
        color: colorStyle.color.disabled,
      }}
      _hover={{
        color: colorStyle.color.primary,
      }}
      {...props}
    />
  );
};

let shouldPreventDefaultOnNextBlur = false;

const App = () => {
  const [colorMode, setColorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const [menuState, setMenuState] = useState('main');
  const navigateMenuBy = (nextMenuState) => (event) => {
    // Prevent the menu from closing when a menu item is clicked
    event.preventDefault();

    // The menu list will be blurred when the menu state changes because of losing focus.
    // We need to set a flag to prevent menu to be closed.
    shouldPreventDefaultOnNextBlur = true;

    setMenuState(nextMenuState);
  };

  return (
    <Menu
      onOpen={() => {
        setMenuState('main');
      }}
    >
      <MenuToggle>
        <Avatar
          backgroundColor={colorStyle.background.secondary}
          color={colorStyle.color.secondary}
          _hover={{
            color: colorStyle.color.primary,
          }}
        >
          <UserTeamIcon size="5x" />
        </Avatar>
      </MenuToggle>
      <FocusLock
        persistentFocus={true}
      >
        <MenuList
          width="max-content"
          onBlur={(event) => {
            if (shouldPreventDefaultOnNextBlur) {
              event.preventDefault();

              // Restore the flag to its initial state
              shouldPreventDefaultOnNextBlur = false;
            }
          }}
        >
          <Box
            display={menuState === 'main' ? 'block' : 'none'}
          >
            <MenuItem>
              <Flex flex="none" mr="3x">
                <SettingsIcon />
              </Flex>
              <Flex flex="auto">
                <Text>Settings</Text>
              </Flex>
            </MenuItem>
            <MenuItem>
              <Flex flex="none" mr="3x">
                <UserTeamIcon />
              </Flex>
              <Flex flex="auto">
                <Text>Accounts</Text>
              </Flex>
            </MenuItem>
            <MenuItem>
              <Flex flex="none" mr="3x">
                <LockIcon />
              </Flex>
              <Flex flex="auto">
                <Text>Privacy control</Text>
              </Flex>
            </MenuItem>
            <MenuDivider />
            <MenuItem
              onClick={navigateMenuBy('appearance')}
            >
              <Flex flex="none" mr="3x">
                <ColorIcon />
              </Flex>
              <Flex flex="auto">
                <Text>Appearance:</Text>
                <Space width="2x" />
                <Text textTransform="capitalize">
                  {colorMode}
                </Text>
              </Flex>
              <Flex flex="none" ml="3x">
                <ChevronRightIcon />
              </Flex>
            </MenuItem>
          </Box>
          <Box
            display={menuState === 'appearance' ? 'block' : 'none'}
          >
            <Flex alignItems="center" px="3x" py="1x">
              <Flex flex="none" mr="3x">
                <IconButton
                  onClick={navigateMenuBy('main')}
                >
                  <ArrowLeftIcon />
                </IconButton>
              </Flex>
              <Flex flex="auto">
                <Text fontSize="md" lineHeight="md">
                  Appearance
                </Text>
              </Flex>
            </Flex>
            <MenuDivider />
            <MenuGroup
              title={(
                <Text fontSize="xs" lineHeight="xs">
                  Setting applies to this browser only
                </Text>
              )}
            >
              <MenuItem
                onClick={(event) => {
                  setColorMode('dark');
                }}
              >
                <Flex flex="none" mr="3x" minWidth="4x">
                  {colorMode === 'dark' && <CheckIcon />}
                </Flex>
                <Flex flex="auto">
                  Dark theme
                </Flex>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setColorMode('light');
                }}
              >
                <Flex flex="none" mr="3x" minWidth="4x">
                  {colorMode === 'light' && <CheckIcon />}
                </Flex>
                <Flex flex="auto">
                  Light theme
                </Flex>
              </MenuItem>
            </MenuGroup>
          </Box>
        </MenuList>
      </FocusLock>
    </Menu>
  );
};

export default App;
