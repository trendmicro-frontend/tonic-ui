import { ExternalLink, Stack, Text } from '@tonic-ui/react';

const App = () => (
  <Stack alignItems="flex-start" spacing="4x">
    <ExternalLink href={location.href}>
      External link
    </ExternalLink>
    <Text>
      For more information, see the{' '}
      <ExternalLink href={location.href} variant="inline">
        documentation
      </ExternalLink>.
    </Text>
  </Stack>
);

export default App;
