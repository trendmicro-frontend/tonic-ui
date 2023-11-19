import { Option, Select } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Select required>
    <Option value="">Choose an option</Option>
    <Option value="dog">Dog</Option>
    <Option value="cat">Cat</Option>
  </Select>
);

export default App;
