import {
  Box,
  Dropdown,
  DropdownButton,
  Text,
} from '@tonic-ui/react';
import { useRef } from 'react';

const items = [
  { id: 'apple', label: 'Apple' },
  { id: 'banana', label: 'Banana' },
  { id: 'cherry', label: 'Cherry' },
];

const App = () => {
  const containerRef = useRef(null);

  return (
    <>
      <Dropdown
        portalled
        defaultValue={items[0]}
        items={items}
        renderToggle={({ renderItem, value }) => (
          <DropdownButton>
            {value ? renderItem(value) : 'Click Me'}
          </DropdownButton>
        )}
        slotProps={{
          content: {
            portalProps: {
              // Render the portalled dropdown into a specific element instead of `document.body`.
              containerRef,
            },
          },
        }}
      />
      <Box
        ref={containerRef}
        mt="4x"
        padding="4x"
        border="1px dashed"
        borderColor="gray:50"
        borderRadius="sm"
        minHeight="240px"
      >
        <Text fontSize="sm" color="gray:60">
          The portalled dropdown is rendered inside this container
        </Text>
      </Box>
    </>
  );
};

export default App;
