import {
  TextLabel,
  Truncate,
} from '@tonic-ui/react';
import React, { useState } from 'react';
import Dropdown from '@/components/Dropdown';

const items = [
  'all',
  'network-events',
  'system-events',
];

const renderItem = (value) => {
  return {
    'all': 'All',
    'network-events': 'Network events',
    'system-events': 'System events',
  }[value];
};

const renderLabel = (value) => {
  const selectionText = renderItem(value);
  return (
    <>
      <TextLabel mr="2x">
        {'Event status:'}
      </TextLabel>
      <Truncate title={selectionText}>
        {selectionText}
      </Truncate>
    </>
  );
};

const App = () => {
  const [value, setValue] = useState('all');

  return (
    <Dropdown
      value={value}
      onChange={setValue}
      items={items}
      renderItem={renderItem}
      renderLabel={renderLabel}
    />
  );
};

export default App;
