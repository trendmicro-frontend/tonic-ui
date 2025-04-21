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
    toggleProps,
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
      toggleProps={toggleProps}
      {...rest}
    >
      {({ getToggleProps }) => {
        if (typeof children === 'function') {
          return children({ getToggleProps });
        }

        const { sx, ...restToggleProps } = getToggleProps();
        return (
          <MenuButton
            {...restToggleProps}
            variant="secondary"
            sx={[
              {
                maxWidth: '100%',
                width: '100%',
                '> :first-of-type': {
                  textAlign: 'left',
                  // Override the default `minWidth: auto` for flex items to enable text truncation
                  minWidth: 0,
                },
              },
              sx, // Allows style overrides
            ]}
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
