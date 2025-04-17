import {
  Button,
} from '@tonic-ui/react';
import {
  MenuIcon,
} from '@tonic-ui/react-icons';
import React, { useState } from 'react';
import DropdownBase from '@/components/DropdownBase';

const options = Array.from({ length: 4 }, (_, i) => ({ value: i + 1 }));

const mapOptionValueToString = (value) => {
  const option = options.find(opt => opt.value === value);
  return option ? `Option ${option.value}` : undefined;
};

const App = () => {
  const [value, setValue] = useState('all');
  const handleSelect = (option) => {
    if (value !== option.value) {
      setValue(option.value);
    }
  };
  const renderOption = (option) => {
    return mapOptionValueToString(option.value);
  };

  return (
    <DropdownBase
      onSelect={handleSelect}
      options={options}
      renderOption={renderOption}
    >
      {({ getToggleProps }) => (
        <Button
          {...getToggleProps()}
          variant="ghost"
        >
          <MenuIcon />
        </Button>
      )}
    </DropdownBase>
  );
};

export default App;
