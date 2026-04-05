import {
  Space,
  Text,
} from '@tonic-ui/react';
import {
  AngleRightIcon,
} from '@tonic-ui/react-icons';
import React, { useState } from 'react';
import { DropdownBase, MenuButtonToggle } from '@/experiments/dropdown';

const items = [
  // Default items
  { value: 'new', label: 'New File' },
  { value: 'open', label: 'Open File' },

  // Divider
  { type: 'divider' },

  // Submenu
  {
    type: 'submenu',
    label: (
      <>
        <Text>Export</Text>
        <Space width="1x" />
        <AngleRightIcon ml="auto" />
      </>
    ),
    children: [
      { value: 'pdf', label: 'Export as PDF' },
      { value: 'docx', label: 'Export as Word' },
      { value: 'image', label: 'Export as Image' },
    ],
  },

  // Divider
  { type: 'divider' },

  // Group
  {
    type: 'group',
    label: 'Recent Files',
    children: [
      { value: 'file1', label: 'Report_Q1.pdf' },
      { value: 'file2', label: 'Budget_2025.xlsx' },
    ],
  },

  // Divider
  { type: 'divider' },

  // Another default item
  { value: 'settings', label: 'Settings' },
];

const App = () => {
  const [value, setValue] = useState();
  const handleSelect = (item) => {
    if (value !== item.value) {
      setValue(item.value);
    }
  };

  return (
    <DropdownBase
      items={items}
      onSelect={handleSelect}
      slots={{
        toggle: MenuButtonToggle,
      }}
      slotProps={{
        toggle: {}, // additional toggle props
        content: {}, // additional content props
      }}
      width={200}
    >
      {value ? `Click Me (${JSON.stringify(value)})` : 'Click Me'}
    </DropdownBase>
  );
};

export default App;
