import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  OverflowTooltip,
  Scrollbar,
} from '@tonic-ui/react';
import React from 'react';

const CustomOverflowTooltip = ({ children }) => {
  return (
    <OverflowTooltip
      label={children}
      PopperProps={{ usePortal: true }}
      nextToCursor={false}
    >
      {children}
    </OverflowTooltip>
  );
};

const App = () => {
  return (
    <Menu width="400px">
      <MenuButton>Options</MenuButton>
      <MenuList width="100%">
        <Scrollbar maxHeight="200px" overflowX="hidden" overflowY="auto">
          <MenuItem>
            <CustomOverflowTooltip>
              This is a very very long string.This is a very very long string.This is a very very long string.This is a very very long string.This is a very very long string.This is a very very long string.</CustomOverflowTooltip>
          </MenuItem>
          <MenuItem>
            <CustomOverflowTooltip>This is a short string.</CustomOverflowTooltip>
          </MenuItem>
          <MenuItem>
            <CustomOverflowTooltip>This is a short string.</CustomOverflowTooltip>
          </MenuItem>
          <MenuItem>
            <CustomOverflowTooltip>This is a short string.</CustomOverflowTooltip>
          </MenuItem>
          <MenuItem>
            <CustomOverflowTooltip>This is a short string.</CustomOverflowTooltip>
          </MenuItem>
          <MenuItem>
            <CustomOverflowTooltip>This is a short string.</CustomOverflowTooltip>
          </MenuItem>
          <MenuItem>
            <CustomOverflowTooltip>This is a short string.</CustomOverflowTooltip>
          </MenuItem>
          <MenuItem>
            <CustomOverflowTooltip>This is a very very long string.This is a very very long string.This is a very very long string.This is a very very long string.This is a very very long string.This is a very very long string.</CustomOverflowTooltip>
          </MenuItem>
          <MenuItem>
            <CustomOverflowTooltip>This is a short string.</CustomOverflowTooltip>
          </MenuItem>
          <MenuItem>
            <CustomOverflowTooltip>This is a short string.</CustomOverflowTooltip>
          </MenuItem>
        </Scrollbar>
      </MenuList>
    </Menu>
  );
};

export default App;
