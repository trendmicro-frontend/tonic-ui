import { Flex, Icon, MenuDivider, MenuItem, Submenu, SubmenuList, SubmenuToggle, Text } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Flex
    justify="space-between"
  >
    <Flex
      flexDirection="column"
    >
      <MenuItem>
        <Text>List item</Text>
      </MenuItem>
      <MenuItem>
        <Text>List item</Text>
      </MenuItem>
      <MenuDivider />
      <Submenu>
        <SubmenuToggle>
          <MenuItem>
            <Flex
              alignItems="center"
              columnGap="2x"
              justifyContent="space-between"
              width="100%"
            >
              <Text>Submenu</Text>
              <Icon icon="angle-right" />
            </Flex>
          </MenuItem>
        </SubmenuToggle>
        <SubmenuList width="max-content">
          <MenuItem>
            <Text>List item</Text>
          </MenuItem>
          <MenuItem>
            <Text>List item</Text>
          </MenuItem>
          <Submenu>
            <SubmenuToggle>
              <MenuItem>
                <Flex
                  alignItems="center"
                  columnGap="2x"
                  justifyContent="space-between"
                  width="100%"
                >
                  <Text>Submenu</Text>
                  <Icon icon="angle-right" />
                </Flex>
              </MenuItem>
            </SubmenuToggle>
            <SubmenuList width="max-content">
              <MenuItem>
                <Text>List item</Text>
              </MenuItem>
              <MenuItem>
                <Text>List item</Text>
              </MenuItem>
            </SubmenuList>
          </Submenu>
        </SubmenuList>
      </Submenu>
    </Flex>
    <Flex
      flexDirection="column"
    >
      <MenuItem pl="9x">
        <Text>List item</Text>
      </MenuItem>
      <MenuItem pl="9x">
        <Text>List item</Text>
      </MenuItem>
      <MenuDivider />
      <Submenu placement="left-start">
        <SubmenuToggle>
          <MenuItem>
            <Flex
              alignItems="center"
              columnGap="2x"
              justifyContent="space-between"
              width="100%"
            >
              <Icon icon="angle-left" />
              <Text>Submenu</Text>
            </Flex>
          </MenuItem>
        </SubmenuToggle>
        <SubmenuList width="max-content">
          <MenuItem pl="9x">
            <Text>List item</Text>
          </MenuItem>
          <MenuItem pl="9x">
            <Text>List item</Text>
          </MenuItem>
          <Submenu placement="left-start">
            <SubmenuToggle>
              <MenuItem>
                <Flex
                  alignItems="center"
                  columnGap="2x"
                  justifyContent="space-between"
                  width="100%"
                >
                  <Icon icon="angle-left" />
                  <Text>Submenu</Text>
                </Flex>
              </MenuItem>
            </SubmenuToggle>
            <SubmenuList
              width="max-content"
            >
              <MenuItem>
                <Text>List item</Text>
              </MenuItem>
              <MenuItem>
                <Text>List item</Text>
              </MenuItem>
            </SubmenuList>
          </Submenu>
        </SubmenuList>
      </Submenu>
    </Flex>
  </Flex>
);

export default App;
