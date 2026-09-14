import { Dropdown, DropdownChip } from '@tonic-ui/react';
import React, { createRef } from 'react';

const items = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
];

// Used as the toggle of a Dropdown
<Dropdown
  items={items}
  renderToggle={({ renderItem, value }) => (
    <DropdownChip>{value ? renderItem(value) : 'Select'}</DropdownChip>
  )}
/>;

// Standalone chip toggle markup
<DropdownChip>Select</DropdownChip>;

// Closable chip
<DropdownChip isClosable onClose={() => {}}>Select</DropdownChip>;

// Disabled chip
<DropdownChip disabled>Select</DropdownChip>;

// sx styles the chip
<DropdownChip sx={{ width: 200 }}>Select</DropdownChip>;

// Ref
const ref = createRef<HTMLElement>();
<DropdownChip ref={ref}>Select</DropdownChip>;

// @ts-expect-error - isClosable must be a boolean
<DropdownChip isClosable="yes">Select</DropdownChip>;

// @ts-expect-error - disabled must be a boolean
<DropdownChip disabled="yes">Select</DropdownChip>;
