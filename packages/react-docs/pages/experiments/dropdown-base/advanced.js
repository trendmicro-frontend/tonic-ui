import {
  Flex,
  Grid,
  Space,
  Text,
} from '@tonic-ui/react';
import {
  AngleRightIcon,
} from '@tonic-ui/react-icons';
import { useState } from 'react';
import { DropdownBase, MenuButtonToggle } from '@/experiments/dropdown';

const items = [
  // Default items
  { id: 'new', label: 'New File' },
  { id: 'open', label: 'Open File' },

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
      { id: 'pdf', label: 'Export as PDF' },
      { id: 'docx', label: 'Export as Word' },
      { id: 'image', label: 'Export as Image' },
    ],
  },

  // Divider
  { type: 'divider' },

  // Group
  {
    type: 'group',
    label: 'Recent Files',
    children: [
      { id: 'file1', label: 'Report_Q1.pdf' },
      { id: 'file2', label: 'Budget_2025.xlsx' },
    ],
  },

  // Divider
  { type: 'divider' },

  // Another default item
  { id: 'settings', label: 'Settings' },
];

const App = () => {
  const [value, setValue] = useState(null);

  return (
    <>
      <Flex fontFamily="mono" mb="4x">
        <Grid
          columnGap="2x"
          rowGap="2x"
          templateColumns="auto 1fr"
        >
          <Text>value:</Text>
          <Text>{JSON.stringify(value)}</Text>
        </Grid>
      </Flex>
      <DropdownBase
        sx={{
          width: 200,
        }}
        items={items}
        onChange={setValue}
        renderToggle={({ getToggleProps, value, renderItem }) => (
          <MenuButtonToggle {...getToggleProps()}>
            {value ? renderItem(value) : 'Click Me'}
          </MenuButtonToggle>
        )}
      />
    </>
  );
};

export default App;
