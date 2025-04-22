import {
  Flex,
  MenuButton,
  Scrollbar,
} from '@tonic-ui/react';
import {
  AngleRightIcon,
} from '@tonic-ui/react-icons';
import React, { useState } from 'react';
import { DropdownBase } from '@/experiments/dropdown';

const options = [
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


const App = () => {
  const [value, setValue] = useState('all');
  const handleSelect = (option) => {
    if (value !== option.value) {
      setValue(option.value);
    }
  };

  return (
    <DropdownBase
      onSelect={handleSelect}
      options={options}
      renderContent={({ options, renderOptions }) => {
        return (
          <Scrollbar maxHeight={240} overflowY="visible" overflowX="hidden">
            {renderOptions(options)}
          </Scrollbar>
        );
      }}
      toggleProps={{
        sx: {
          maxWidth: '100%',
          width: '100%',
          '> :first-of-type': {
            // Override flex item's default `minWidth: auto` to allow text truncation
            minWidth: 0,
          },
        },
      }}
      width={200}
    >
      {({ getToggleProps }) => {
        const { sx, ...restToggleProps } = getToggleProps();
        return (
          <MenuButton
            {...restToggleProps}
            variant="secondary"
            sx={sx}
          >
            Click Me
          </MenuButton>
        );
      }}
    </DropdownBase>
  );
};

export default App;
