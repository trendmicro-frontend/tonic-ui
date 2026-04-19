import { Divider, Stack } from '@tonic-ui/react';
const App = () => (
  <Stack direction="column" spacing="4x">
    <Divider variant="solid" orientation="horizontal" />
    <Divider variant="dashed" orientation="horizontal" />
    <Divider variant="dotted" orientation="horizontal" />
  </Stack>
);

export default App;
