import { Button, Menu, MenuItem, MenuList, MenuToggle, MenuToggleIcon, Popover, PopoverContent, PopoverTrigger, Text } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Menu>
    <MenuToggle
      disabled={true} // Use the `disabled` prop to control whether the button will be disabled
    >
      {({ getMenuToggleProps }) => (
        <Popover
          disabled={false} // Use the `disabled` prop to control whether the popover will be displayed
          trigger="hover"
        >
          <PopoverTrigger shouldWrapChildren>
            <Button
              {...getMenuToggleProps()}
              variant="secondary"
              columnGap="1x"
            >
              <Text>Options</Text>
              <MenuToggleIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            Popover
          </PopoverContent>
        </Popover>
      )}
    </MenuToggle>
    <MenuList width="max-content">
      <MenuItem>
        List item 1
      </MenuItem>
      <MenuItem>
        List item 2
      </MenuItem>
      <MenuItem>
        List item 3
      </MenuItem>
    </MenuList>
  </Menu>
);

export default App;
