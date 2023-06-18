import {
  Text,
  TextLabel,
  Truncate,
} from '@tonic-ui/react';
import React, { useState } from 'react';
import Multiselect from '@/components/Multiselect';

const policyData = {
  policies: [
    { id: '0', description: 'Default policy' },
    ...Array.from({ length: 10 }, (_, i) => ({
      id: String(i + 1),
      description: `Policy ${i + 1}`,
    })),
  ],
};

const policyMap = (() => {
  const map = new Map();
  policyData.policies.forEach((policy) => {
    // Use the policy ID as the key and ensure it's a string rather than a number
    const key = String(policy.id);
    map.set(key, policy);
  });
  return map;
})();

const items = [...policyMap.keys()];

const renderItem = (value) => {
  const policy = policyMap.get(value);
  return policy?.description;
};

const renderLabel = (value) => {
  const selectionCount = value.length;
  const isNoneSelected = selectionCount === 0;
  const isAllSelected = selectionCount === items.length;

  if (isNoneSelected) {
    const selectionText = 'Select';
    return (
      <>
        <TextLabel mr="2x">
          {'Policy:'}
        </TextLabel>
        <Truncate title={selectionText}>
          {selectionText}
        </Truncate>
      </>
    );
  }

  if (isAllSelected) {
    const selectionText = 'All'; 
    return (
      <>
        <TextLabel mr="2x">
          {'Policy:'}
        </TextLabel>
        <Truncate title={selectionText}>
          {selectionText}
        </Truncate>
      </>
    );
  }

  const selectionText = value.map(renderItem).join(', ');
  return (
    <>
      <TextLabel mr="2x">
        {'Policy:'}
      </TextLabel>
      <Truncate title={selectionText}>
        {selectionText}
      </Truncate>
      <Text ml="1x">
        {`(${selectionCount})`}
      </Text>
    </>
  );
};

const App = () => {
  const [value, setValue] = useState(items);

  return (
    <Multiselect
      isSearchable={true}
      value={value}
      onChange={setValue}
      items={items}
      renderItem={renderItem}
      renderLabel={renderLabel}
    />
  );
};

export default App;
