import {
  Flex,
  MenuButton,
  OverflowTooltip,
  Text,
} from '@tonic-ui/react';
import React, { useState } from 'react';
import Multiselect from '@/components/Multiselect';
import MutedText from '@/components/MutedText';

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
      <Flex alignItems="center">
        <MutedText mr="2x">
          Policy:
        </MutedText>
        <OverflowTooltip
          PopperProps={{ usePortal: true }}
          label={selectionText}
        >
          {selectionText}
        </OverflowTooltip>
      </Flex>
    );
  }

  if (isAllSelected) {
    const selectionText = 'All'; 
    return (
      <Flex alignItems="center">
        <MutedText mr="2x">
          Policy:
        </MutedText>
        <OverflowTooltip
          PopperProps={{ usePortal: true }}
          label={selectionText}
        >
          {selectionText}
        </OverflowTooltip>
      </Flex>
    );
  }

  const selectionText = value.map(renderOption).join(', ');
  return (
    <Flex alignItems="center">
      <MutedText mr="2x">
        Policy:
      </MutedText>
      <OverflowTooltip
        PopperProps={{ usePortal: true }}
        label={selectionText}
      >
        {selectionText}
      </OverflowTooltip>
      <Text ml="1x">
        {`(${selectionCount})`}
      </Text>
    </Flex>
  );
};

const App = () => {
  const [value, setValue] = useState(options);

  return (
    <Multiselect
      isSearchable={true}
      value={value}
      onChange={setValue}
      options={options}
      renderOption={renderOption}
      shouldSelectAllIfNoneSelected={true}
      width={200}
    >
      {({ getToggleProps }) => (
        <MenuButton
          {...getToggleProps()}
          variant="secondary"
          sx={{
            width: '100%',
            '> :first-of-type': {
              // Override flex item's default `minWidth: auto` to allow text truncation
              minWidth: 0,
            },
          }}
        >
          {renderLabel(value)}
        </MenuButton>
      )}
    </Multiselect>
  );
};

export default App;
