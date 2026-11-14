import { ExternalLink, Stack } from '@tonic-ui/react';

const App = () => (
  <Stack spacing="4x" shouldWrapChildren>
    <ExternalLink href={location.href} disabled>
      External link
    </ExternalLink>
    <ExternalLink href={location.href} disabled variant="inline">
      Inline link
    </ExternalLink>
    <ExternalLink href={location.href} disabled variant="subtle">
      Subtle link
    </ExternalLink>
  </Stack>
);

export default App;
