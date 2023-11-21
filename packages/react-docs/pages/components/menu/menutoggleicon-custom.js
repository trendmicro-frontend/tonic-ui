import { Icon, Menu, MenuItem, MenuList, MenuToggle, MenuToggleIcon } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Menu placement="bottom-start">
    {({ isOpen, direction }) => {
      return (
        <>
          <MenuToggle>
            <MenuToggleIcon>
              {(state, { ref, style: styleProps }) => {
                // direction is either 'up' or 'down'
                const icon = `arrow-${direction}`;
                styleProps.transform = isOpen ? 'scaleY(-1)' : 'scaleY(1)';

                return (
                  <Icon
                    ref={ref}
                    icon={icon}
                    size="4x"
                    {...styleProps}
                  />
                );
              }}
            </MenuToggleIcon>
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
        </>
      );
    }}
  </Menu>
);

export default App;
