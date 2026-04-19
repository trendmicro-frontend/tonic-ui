import { SearchInput, Stack } from '@tonic-ui/react';
const App = () => (
  <Stack direction="column" spacing="4x">
    <SearchInput size="sm" placeholder="Small size (24px)" />
    <SearchInput size="md" placeholder="Default size (32px)" />
    <SearchInput size="lg" placeholder="Large size (40px)" />
  </Stack>
);

export default App;
