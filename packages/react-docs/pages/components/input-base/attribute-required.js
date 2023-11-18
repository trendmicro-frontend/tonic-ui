import { InputBase } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <InputBase
    required
    placeholder="Placeholder text"
    px="2x"
    py="1x"
    border={1}
    borderColor="transparent"
    _invalid={{
      borderColor: 'red:50',
    }}
  />
);

export default App;
