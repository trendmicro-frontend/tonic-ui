import {
  Flex,
  MenuButton,
  Text,
} from '@tonic-ui/react';
import React, { useState } from 'react';
import Dropdown from '@/components/Dropdown';
import MutedText from '@/components/MutedText';

const options = [
  { value: 'all' },
  { value: 'network-events' },
  { value: 'system-events' },
];

const mapOptionValueToText = (value) => {
  return {
    'all': 'All',
    'network-events': 'Network events',
    'system-events': 'System events',
  }[value];
};

const App = () => {
  const [value, setValue] = useState('all');
  const renderOption = (option) => {
    return mapOptionValueToText(option.value);
  };
  const handleChange = (option) => {
    setValue(option.value);
  };
  const renderButtonLabel = (value) => {
    return (
      <Flex columnGap="2x">
        <MutedText>
          {'Event status:'}
        </MutedText>
        <Text>
          {mapOptionValueToText(value)}
        </Text>
      </Flex>
    );
  };

  return (
    <Dropdown
      onChange={handleChange}
      options={options}
      renderOption={renderOption}
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
          {renderButtonLabel(value)}
        </MenuButton>
      )}
    </Dropdown>
  );
};

export default App;
