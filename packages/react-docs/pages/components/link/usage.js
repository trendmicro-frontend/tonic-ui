import { Link, Stack, Text } from '@tonic-ui/react';

const App = () => (
  <Stack alignItems="flex-start" spacing="4x">
    <Link href="#">
      Link
    </Link>
    <Text>
      Inline links appear within text, for example{' '}
      <Link href="#" variant="inline">
        get started here
      </Link>.
    </Text>
  </Stack>
);

export default App;
