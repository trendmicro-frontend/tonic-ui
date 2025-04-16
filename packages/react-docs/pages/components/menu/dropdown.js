import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  OverflowTooltip,
  Text,
  TextLabel,
} from '@tonic-ui/react';
import React, { useState } from 'react';
import Dropdown from '@/components/Dropdown';
import FormGroup from '@/components/FormGroup';
import MutedText from '@/components/MutedText';

const options = [
  { value: 'all' },
  { value: 'network-events' },
  { value: 'system-events' },
];

const mapOptionValueToText = (value) => {
  return {
    'all': 'All events',
    'network-events': 'Network events',
    'system-events': 'System events',
  }[value];
};

const App = () => {
  const [width, setWidth] = useState('auto');
  const [value, setValue] = useState('all');
  const handleSelect = (option) => {
    if (value !== option.value) {
      setValue(option.value);
    }
  };
  const renderValue = (value) => {
    const labelText = 'Event status:';
    const valueText = mapOptionValueToText(value);
    return (
      <Flex alignItems="center" columnGap="2x">
        <OverflowTooltip label={`${labelText} ${valueText}`}>
          {({ ref, style }) => (
            <MutedText
              ref={ref}
              {...style}
              maxWidth="100%"
              flex="none"
            >
              {labelText}
            </MutedText>
          )}
        </OverflowTooltip>
        <OverflowTooltip label={valueText}>
          {({ ref, style }) => (
            <Text
              ref={ref}
              {...style}
              flex="auto"
            >
              {valueText}
            </Text>
        )}
        </OverflowTooltip>
      </Flex>
    );
  };
  const renderOption = (option) => {
    return mapOptionValueToText(option.value);
  };
  const changeWidthBy = (value) => () => {
    setWidth(value);
  };

  return (
    <>
      <FormGroup>
        <Box mb="2x">
          <TextLabel>
            Try changing the dropdown width to see how the overflow tooltip behaves:
          </TextLabel>
        </Box>
        <ButtonGroup
          variant="secondary"
          sx={{
            '> *:not(:first-of-type)': {
              marginLeft: -1
            }
          }}
        >
          {['auto', '100px', '150px'].map(value => (
            <Button
              disabled={width === 'full'}
              key={value}
              selected={value === width}
              onClick={changeWidthBy(value)}
              minWidth="15x"
            >
              {value}
            </Button>
          ))}
        </ButtonGroup>
      </FormGroup>
      <Divider my="4x" />
      <Dropdown
        onSelect={handleSelect}
        options={options}
        renderOption={renderOption}
        width={width}
      >
        {renderValue(value)}
      </Dropdown>
    </>
  );
};

export default App;
