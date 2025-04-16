import {
  Menu,
  MenuItem,
  MenuList,
  MenuToggle,
} from '@tonic-ui/react';
import { runIfFn } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';

const DropdownBase = forwardRef((
  {
    children,
    options = [],
    onSelect,
    renderOption,
    ...rest
  },
  ref,
) => {
  const handleClickBy = (option) => (event) => {
    onSelect(option);
  };

  return (
    <Menu
      ref={ref}
      {...rest}
    >
      <MenuToggle>
        {({ getMenuToggleProps }) => {
          return runIfFn(children, { getToggleProps: getMenuToggleProps });
        }}
      </MenuToggle>
      <MenuList
        sx={{
          // Set the minimum width to fit the menu's content while occupying full width
          minWidth: 'max-content',
          width: '100%',
        }}
      >
        {options.map((option, index) => {
          const key = [index, option?.value ?? ''].join('_');

          return (
            <MenuItem
              key={key}
              onClick={handleClickBy(option)}
              {...option?.props}
            >
              {(typeof renderOption === 'function') ? renderOption(option) : option?.value}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
});

DropdownBase.displayName = 'DropdownBase';

export default DropdownBase;
