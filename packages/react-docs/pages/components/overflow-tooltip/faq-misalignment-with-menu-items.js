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
    >
      {children}
    </OverflowTooltip>
  );
};

const App = () => {
  const shortText = 'This text string is not truncated';
  const longText = 'This text string will be truncated when exceeding its container width';

  return (
    <Menu width={240}>
      <MenuButton>Options</MenuButton>
      <MenuList width="100%">
        <Scrollbar maxHeight={200} overflowX="hidden" overflowY="auto">
          <MenuItem>
            <CustomOverflowTooltip>
              {longText}
            </CustomOverflowTooltip>
          </MenuItem>
          <MenuItem>
            <CustomOverflowTooltip>
              {shortText}
            </CustomOverflowTooltip>
          </MenuItem>
          <MenuItem>
            <CustomOverflowTooltip>
              {shortText}
            </CustomOverflowTooltip>
          </MenuItem>
          <MenuItem>
            <CustomOverflowTooltip>
              {shortText}
            </CustomOverflowTooltip>
          </MenuItem>
          <MenuItem>
            <CustomOverflowTooltip>
              {shortText}
            </CustomOverflowTooltip>
          </MenuItem>
          <MenuItem>
            <CustomOverflowTooltip>
              {shortText}
            </CustomOverflowTooltip>
          </MenuItem>
          <MenuItem>
            <CustomOverflowTooltip>
              {longText}
            </CustomOverflowTooltip>
          </MenuItem>
          <MenuItem>
            <CustomOverflowTooltip>
              {shortText}
            </CustomOverflowTooltip>
          </MenuItem>
          <MenuItem>
            <CustomOverflowTooltip>
              {shortText}
            </CustomOverflowTooltip>
          </MenuItem>
          <MenuItem>
            <CustomOverflowTooltip>
              {shortText}
            </CustomOverflowTooltip>
          </MenuItem>
        </Scrollbar>
      </MenuList>
    </Menu>
  );
};

export default App;
