import { forwardRef, useCallback } from 'react';
import DropdownBase from './DropdownBase';
import MenuButtonToggle from './MenuButtonToggle';

const Dropdown = forwardRef((
  {
    children,
    defaultValue,
    items = [],
    matchWidth,
    onChange,
    portalled,
    renderContent,
    renderItem,
    renderToggle: renderToggleProp,
    slots = {},
    slotProps = {},
    value,
    ...rest
  },
  ref
) => {
  const defaultRenderToggle = useCallback(({ getToggleProps, value: selectedValue, renderItem: resolvedRenderItem }) => {
    const Toggle = slots.toggle ?? MenuButtonToggle;
    return (
      <Toggle {...getToggleProps()}>
        {children ?? resolvedRenderItem(selectedValue)}
      </Toggle>
    );
  }, [slots.toggle, children]);
  const renderToggle = renderToggleProp ?? defaultRenderToggle;

  return (
    <DropdownBase
      defaultValue={defaultValue}
      items={items}
      matchWidth={matchWidth}
      onChange={onChange}
      portalled={portalled}
      renderContent={renderContent}
      renderItem={renderItem}
      renderToggle={renderToggle}
      slots={slots}
      slotProps={slotProps}
      value={value}
      {...rest}
    />
  );
});

Dropdown.displayName = 'Dropdown';

export default Dropdown;
