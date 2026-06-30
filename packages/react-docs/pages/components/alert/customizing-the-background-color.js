import { Alert, Stack, Text } from '@tonic-ui/react';

const App = () => (
  <Stack direction="column" spacing="4x">
    <Alert
      variant="solid"
      severity="none"
      backgroundColor="promotion._overlay"
    >
      <Text>This is a promotion message</Text>
    </Alert>
    <Alert
      variant="outline"
      severity="none"
      borderColor="promotion.icon"
    >
      <Text>This is a promotion message</Text>
    </Alert>
  </Stack>
);

export default App;
