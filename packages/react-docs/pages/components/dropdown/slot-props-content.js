import {
  Dropdown,
  DropdownButton,
} from '@tonic-ui/react';

const items = [
  { id: 'new', label: 'New File' },
  { id: 'open', label: 'Open File' },
  { id: 'settings', label: 'Settings' },
];

const App = () => (
  <Dropdown
    sx={{
      width: 200,
    }}
    items={items}
    renderToggle={({ renderItem, value }) => (
      <DropdownButton>
        {value ? renderItem(value) : 'Click Me'}
      </DropdownButton>
    )}
    slotProps={{
      content: {
        sx: {
          boxShadow: 'down.medium',
        },
      },
    }}
  />
);

export default App;
