import { Truncate } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Truncate
    title="This is a very long text that will be truncated"
    width={240}
  >
    This is a very long text that will be truncated
  </Truncate>
);

export default App;
