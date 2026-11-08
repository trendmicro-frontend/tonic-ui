import { InternalLink, Text } from '@tonic-ui/react';

const App = () => (
  <Text>
    To manage the status of excluded applications, go to Exclusions &gt;{' '}
    <InternalLink href="#" variant="inline">Internal link</InternalLink>.
  </Text>
);

export default App;
