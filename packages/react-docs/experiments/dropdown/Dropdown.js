import { MenuButton } from '@tonic-ui/react';
import React, { forwardRef } from 'react';
import DropdownBase from './DropdownBase';

const DefaultToggle = forwardRef((props, ref) => {
  const { children, sx, ...rest } = props;
  return (
    <MenuButton
      {...rest}
      variant="secondary"
      sx={[
        {
          maxWidth: '100%',
          width: '100%',
          '> :first-of-type': {
            textAlign: 'left', // [optional] Useful when the trigger is a button to align text properly
            minWidth: 0, // Override the default `minWidth: auto` for flex items to enable text truncation
          },
        },
        sx, // Allows style overrides
      ]}
    >
      {children}
    </MenuButton>
  );
});

DefaultToggle.displayName = 'DefaultToggle';

const Dropdown = forwardRef((
  {
    children,
    onSelect,
    items = [],
    renderContent,
    renderItem,
    slots = {},
    slotProps = {},
    ...rest
  },
  ref
) => {
  return (
    <DropdownBase
      items={items}
      onSelect={onSelect}
      renderContent={renderContent}
      renderItem={renderItem}
      slots={{
        ...slots,
        toggle: slots?.toggle ?? DefaultToggle,
      }}
      slotProps={slotProps}
      {...rest}
    >
      {children}
    </DropdownBase>
  );
});

Dropdown.displayName = 'Dropdown';

export default Dropdown;
