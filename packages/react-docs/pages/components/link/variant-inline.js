import { Link, Text } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Text>
    You can
    {' '}<Link
      href="#"
      variant="inline"
    >
      get started here
    </Link>{' '}
    to explore more examples.
  </Text>
);

export default App;
