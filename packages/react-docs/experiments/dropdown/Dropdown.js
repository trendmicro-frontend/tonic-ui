import { forwardRef } from 'react';
import DropdownBase from './DropdownBase';
import MenuButtonToggle from './MenuButtonToggle';

const Dropdown = forwardRef((
  {
    children,
    items = [],
    matchWidth,
    onChange,
    portalled,
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
      matchWidth={matchWidth}
      onChange={onChange}
      portalled={portalled}
      ref={ref}
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
