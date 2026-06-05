import { SearchInput, Stack } from '@tonic-ui/react';

const App = () => (
  <Stack directin="column" spacing="4x">
    <SearchInput disabled placeholder="Placeholder text" />
    <SearchInput disabled placeholder="Placeholder text" defaultValue="Disabled input" />
  </Stack>
);

export default App;
