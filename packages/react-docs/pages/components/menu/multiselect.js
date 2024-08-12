import {
  Flex,
  MenuButton,
  OverflowTooltip,
  Text,
  TextLabel,
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

const options = [...policyMap.keys()];

const renderOption = (value) => {
  const policy = policyMap.get(value);
  return policy?.description;
};

const renderLabel = (value) => {
  const selectionCount = value.length;
  const isNoneSelected = selectionCount === 0;
  const isAllSelected = selectionCount === options.length;

  if (isNoneSelected) {
    const selectionText = 'Select';
    return (
      <>
        <TextLabel mr="2x">
          {'Policy:'}
        </TextLabel>
        <OverflowTooltip
          PopperProps={{ usePortal: true }}
          label={selectionText}
        >
          {selectionText}
        </OverflowTooltip>
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
        <OverflowTooltip
          PopperProps={{ usePortal: true }}
          label={selectionText}
        >
          {selectionText}
        </OverflowTooltip>
      </>
    );
  }

  const selectionText = value.map(renderOption).join(', ');
  return (
    <>
      <TextLabel mr="2x">
        {'Policy:'}
      </TextLabel>
      <OverflowTooltip
        PopperProps={{ usePortal: true }}
        label={selectionText}
      >
        {selectionText}
      </OverflowTooltip>
      <Text ml="1x">
        {`(${selectionCount})`}
      </Text>
    </>
  );
};

const App = () => {
  const [value, setValue] = useState(options);
  const width = 200;
  const maxWidth = typeof width === 'number'
    ? `calc(${width}px - 48px)`
    : `calc(${width} - 48px)`;

  return (
    <Multiselect
      isSearchable={true}
      value={value}
      onChange={setValue}
      options={options}
      renderOption={renderOption}
      shouldSelectAllIfNoneSelected={true}
    >
      {({ getToggleProps }) => (
        <MenuButton
          {...getToggleProps()}
          variant="secondary"
          width={width}
        >
          <Flex maxWidth={maxWidth}>
            {renderLabel(value)}
          </Flex>
        </MenuButton>
      )}
    </Multiselect>
  );
};

export default App;
