import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  OverflowTooltip,
  Scrollbar,
  Text,
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
  const shortText = (
    <Text>This text string is not truncated</Text>
  );
  const longText = (
    <Text>This text string will be truncated when exceeding its container width</Text>
  );

  return (
    <Menu width={360}>
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
