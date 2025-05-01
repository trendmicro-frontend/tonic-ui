import React, { forwardRef } from 'react';
import DropdownBase from './DropdownBase';
import MenuButtonToggle from './MenuButtonToggle';

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
        toggle: slots?.toggle ?? MenuButtonToggle,
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
