import { Dropdown, DropdownButton, DropdownChip, DropdownToggle } from '@tonic-ui/react';
import React, { createRef } from 'react';

const items = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { type: 'divider' },
  { type: 'group', label: 'Fruits', children: [{ value: 'cherry', label: 'Cherry' }] },
];

// Basic usage — renderToggle defaults to an unstyled DropdownToggle
<Dropdown items={items} />;

// With defaultValue (uncontrolled) + onChange
<Dropdown items={items} defaultValue={items[0]} onChange={(item) => console.log(item)} />;

// Controlled value
<Dropdown items={items} value={items[1]} onChange={(item) => console.log(item)} />;

// With renderItem
<Dropdown items={items} renderItem={(item) => item.label} />;

// With renderToggle
<Dropdown
  items={items}
  renderToggle={({ renderItem, value }) => (
    <DropdownButton>{value ? renderItem(value) : 'Select'}</DropdownButton>
  )}
/>;
<Dropdown
  items={items}
  renderToggle={({ renderItem, value }) => (
    <DropdownToggle>
      {value ? renderItem(value) : null}
    </DropdownToggle>
  )}
/>;

<Dropdown
  items={items}
  renderToggle={({ renderItem, value }) => (
    <DropdownChip isClosable onClose={() => {}}>
      {value ? renderItem(value) : 'Select'}
    </DropdownChip>
  )}
/>;

// With renderContent
<Dropdown
  items={items}
  renderContent={({ items: list, renderItems }) => <div>{renderItems(list)}</div>}
/>;

// With matchWidth / portalled
<Dropdown items={items} matchWidth />;
<Dropdown items={items} matchWidth={false} />;
<Dropdown items={items} portalled />;

// With slotProps.content
<Dropdown items={items} slotProps={{ content: { width: 320 } }} />;

// Box pass-through props
<Dropdown items={items} sx={{ width: 200 }} />;

// Ref (renders a div root via Menu)
const rootRef = createRef<HTMLDivElement>();
<Dropdown items={items} ref={rootRef} />;

// `as` polymorphism
<Dropdown as="section" items={items} />;

// Wrong ref type
const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement is not assignable to HTMLDivElement
<Dropdown items={items} ref={wrongRef} />;

// @ts-expect-error - matchWidth must be a boolean
<Dropdown items={items} matchWidth="yes" />;

// @ts-expect-error - renderToggle must be a function
<Dropdown items={items} renderToggle="nope" />;
