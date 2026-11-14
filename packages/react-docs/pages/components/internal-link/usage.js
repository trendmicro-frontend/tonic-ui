import { InternalLink, Stack, Text } from '@tonic-ui/react';

const App = () => (
  <Stack alignItems="flex-start" spacing="4x">
    <InternalLink href="#">
      Internal link
    </InternalLink>
    <Text>
      To manage the status of excluded applications, go to Exclusions &gt;{' '}
      <InternalLink href="#" variant="inline">
        Internal link
      </InternalLink>
    </Text>
  </Stack>
);

export default App;
