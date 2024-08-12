import {
  Flex,
  MenuButton,
  OverflowTooltip,
  TextLabel,
} from '@tonic-ui/react';
import React, { useState } from 'react';
import Dropdown from '@/components/Dropdown';

const options = [
  'all',
  'network-events',
  'system-events',
];

const renderOption = (value) => {
  return {
    'all': 'All',
    'network-events': 'Network events',
    'system-events': 'System events',
  }[value];
};

const renderLabel = (value) => {
  const selectionText = renderOption(value);

  return (
    <>
      <TextLabel mr="2x">
        {'Event status:'}
      </TextLabel>
      <OverflowTooltip
        PopperProps={{ usePortal: true }}
        label={selectionText}
      >
        {selectionText}
      </OverflowTooltip>
    </>
  );
};

const App = () => {
  const [value, setValue] = useState('all');
  const width = 200;
  const maxWidth = typeof width === 'number'
    ? `calc(${width}px - 48px)`
    : `calc(${width} - 48px)`;

  return (
    <Dropdown
      value={value}
      onChange={setValue}
      options={options}
      renderOption={renderOption}
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
    </Dropdown>
  );
};

export default App;
