import { MenuButton } from '@tonic-ui/react';
import React, { forwardRef } from 'react';
import DropdownBase from './DropdownBase';

const Dropdown = forwardRef((
  {
    children,
    onSelect,
    options = [],
    renderContent,
    renderOption,
    ...rest
  },
  ref
) => {
  return (
    <DropdownBase
      options={options}
      onSelect={onSelect}
      renderContent={renderContent}
      renderOption={renderOption}
      {...rest}
    >
      {({ getToggleProps }) => {
        if (typeof children === 'function') {
          return children({ getToggleProps });
        }

        return (
          <MenuButton
            {...getToggleProps()}
            variant="secondary"
            sx={{
              maxWidth: '100%',
              '> :first-of-type': {
                // Override flex item's default `minWidth: auto` to allow text truncation
                minWidth: 0,
              },
            }}
          >
            {children}
          </MenuButton>
        );
      }}
    </DropdownBase>
  );
});

Dropdown.displayName = 'Dropdown';

export default Dropdown;
