import { Tooltip } from '@tonic-ui/react';
import { SearchOIcon } from '@tonic-ui/react-icons';
import React from 'react';

const App = () => (
  <Tooltip label="Search" arrow={false}>
    <SearchOIcon />
  </Tooltip>
);

export default App;
