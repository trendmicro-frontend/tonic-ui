import { InternalLink, Stack } from '@tonic-ui/react';

const App = () => (
  <Stack spacing="4x" shouldWrapChildren>
    <InternalLink href="#" disabled>
      Internal link
    </InternalLink>
    <InternalLink href="#" disabled variant="inline">
      Inline link
    </InternalLink>
    <InternalLink href="#" disabled variant="subtle">
      Subtle link
    </InternalLink>
  </Stack>
);

export default App;
