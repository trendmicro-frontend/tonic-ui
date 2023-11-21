import { Option, OptionGroup, Select, TextLabel } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <>
    <TextLabel mb="1x">Label:</TextLabel>
    <Select>
      <Option value="">Choose an option</Option>
      <OptionGroup label="Category 1">
        <Option value={1}>Option 1</Option>
        <Option value={2}>Option 2</Option>
      </OptionGroup>
      <OptionGroup label="Category 2">
        <Option value={3}>Option 3</Option>
        <Option value={4}>Option 4</Option>
      </OptionGroup>
    </Select>
  </>
);

export default App;
