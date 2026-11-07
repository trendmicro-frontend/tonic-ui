import { SearchInput, Stack } from '@tonic-ui/react';

const App = () => (
  <Stack direction="column" spacing="4x">
    <SearchInput isClosable placeholder="Placeholder text" />
    <SearchInput isClosable readOnly defaultValue="Read-only input" />
  </Stack>
);

export default App;
