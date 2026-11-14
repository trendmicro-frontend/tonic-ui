import { ExternalLink, Text } from '@tonic-ui/react';

const App = () => (
  <Text>
    For more information, see the{' '}
    <ExternalLink href={location.href} variant="inline">documentation</ExternalLink>.
  </Text>
);

export default App;
