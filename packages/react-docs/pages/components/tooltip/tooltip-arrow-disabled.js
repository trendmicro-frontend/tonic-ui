import { Icon, Tooltip } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Tooltip label="Search" arrow={false}>
    <Icon icon="search-o" />
  </Tooltip>
);

export default App;
