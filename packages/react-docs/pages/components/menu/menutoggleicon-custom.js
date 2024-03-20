import { Menu, MenuItem, MenuList, MenuToggle, MenuToggleIcon } from '@tonic-ui/react';
import {
  AngleUpIcon,
  AngleDownIcon,
  AngleLeftIcon,
  AngleRightIcon,
} from '@tonic-ui/react-icons';
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
                const IconComponent = {
                  up: AngleUpIcon,
                  down: AngleDownIcon,
                  left: AngleLeftIcon,
                  right: AngleRightIcon,
                }[direction];
                if (direction === 'up' || direction === 'down') {
                  styleProps.transform = isOpen ? 'scaleY(-1)' : 'scaleY(1)';
                } else if (direction === 'left' || direction === 'right') {
                  styleProps.transform = isOpen ? 'scaleX(-1)' : 'scaleX(1)';
                }

                return (
                  <IconComponent
                    ref={ref}
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
