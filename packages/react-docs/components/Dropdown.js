import { MenuButton } from '@tonic-ui/react';
import { runIfFn } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import DropdownBase from './DropdownBase';

const Dropdown = forwardRef((
  {
    children,
    options = [],
    onSelect,
    renderOption,
    ...rest
  },
  ref
) => {
  return (
    <DropdownBase
      options={options}
      onSelect={onSelect}
      renderOption={renderOption}
      {...rest}
    >
      {({ getToggleProps }) => (
        <MenuButton
          {...getToggleProps()}
          variant="secondary"
          sx={{
            width: '100%',
            '> :first-of-type': {
              // Override flex item's default `minWidth: auto` to allow text truncation
              minWidth: 0,
            },
          }}
        >
          {runIfFn(children)}
        </MenuButton>
      )}
    </DropdownBase>
  );
});

Dropdown.displayName = 'Dropdown';

export default Dropdown;
