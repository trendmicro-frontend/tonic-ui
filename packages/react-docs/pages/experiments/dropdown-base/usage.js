import {
  Flex,
  MenuButton,
  Scrollbar,
} from '@tonic-ui/react';
import {
  AngleRightIcon,
} from '@tonic-ui/react-icons';
import React, { forwardRef, useState } from 'react';
import { DropdownBase } from '@/experiments/dropdown';

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
      <Flex
        alignItems="center"
        columnGap="2x"
        justifyContent="space-between"
        width="100%"
      >
        Export
        <AngleRightIcon />
      </Flex>
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

const CustomToggle = forwardRef(({ sx, ...rest }, ref) => {
  return (
    <MenuButton
      ref={ref}
      {...rest}
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
      variant="secondary"
    />
  );
});

CustomToggle.displayName = 'CutomToggle';

const App = () => {
  const [value, setValue] = useState();
  const handleSelect = (item) => {
    if (value !== item.value) {
      setValue(item.value);
    }
  };

  return (
    <DropdownBase
      onSelect={handleSelect}
      items={items}
      renderContent={({ items, renderItems }) => {
        return (
          <Scrollbar maxHeight={240} overflowY="visible" overflowX="hidden">
            {renderItems(items)}
          </Scrollbar>
        );
      }}
      slots={{
        toggle: CustomToggle,
      }}
      width={200}
    >
      {value ? `Click Me (${JSON.stringify(value)})` : 'Click Me'}
    </DropdownBase>
  );
};

export default App;
