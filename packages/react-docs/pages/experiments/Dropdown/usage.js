import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  MenuButton,
  OverflowTooltip,
  Scrollbar,
  Tag,
  Text,
  TextLabel,
  Tooltip,
} from '@tonic-ui/react';
import {
  InfoOIcon,
} from '@tonic-ui/react-icons';
import React, { useState } from 'react';
import Dropdown from '@/components/Dropdown';
import FormGroup from '@/components/FormGroup';
import MutedText from '@/components/MutedText';

const options = [
  { value: 'all', label: 'All' },
  { value: 'network', label: 'Network events' },
  { value: 'system', label: 'System events' },
];

const useSelection = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  const changeBy = (value) => () => setValue(value);
  return [value, changeBy];
};

const App = () => {
  const [width, changeWidthBy] = useSelection('auto');
  const [toggler, changeTogglerBy] = useSelection('MenuButton');
  const [value, setValue] = useState('all');
  const offset = (toggler === 'Tag') ? [0, 4] : undefined;

  const handleSelect = (option) => {
    if (value !== option.value) {
      setValue(option.value);
    }
  };

  const renderValue = (value) => {
    const fieldText = 'Event status:';
    const option = options.find(option => option.value === value);
    return (
      <Flex alignItems="center" columnGap="2x" width="100%">
        <OverflowTooltip
          PopperProps={{
            usePortal: true,
          }}
          label={`${fieldText} ${option?.label}`}
        >
          {({ ref, style }) => (
            <MutedText
              ref={ref}
              {...style}
              maxWidth="100%"
              flex="none"
            >
              {fieldText}
            </MutedText>
          )}
        </OverflowTooltip>
        <OverflowTooltip
          PopperProps={{
            usePortal: true,
          }}
          label={option?.label}
        >
          {({ ref, style }) => (
            <Text
              ref={ref}
              {...style}
              flex="auto"
            >
              {option?.label}
            </Text>
        )}
        </OverflowTooltip>
      </Flex>
    );
  };

  return (
    <>
      <FormGroup>
        <Box mb="2x">
          <Flex alignItems="center" columnGap="2x">
            <TextLabel>
              width
            </TextLabel>
            <Tooltip label="Try changing the dropdown width to see how the overflow tooltip behaves.">
              <InfoOIcon />
            </Tooltip>
          </Flex>
        </Box>
        <ButtonGroup
          variant="secondary"
          sx={{
            '> *:not(:first-of-type)': {
              marginLeft: -1
            },
            mb: '1x',
          }}
        >
          {['auto', '80px', '160px'].map(value => (
            <Button
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
      <FormGroup>
        <Box mb="2x">
          <Flex alignItems="center" columnGap="2x">
            <TextLabel>
              toggler
            </TextLabel>
          </Flex>
        </Box>
        <ButtonGroup
          variant="secondary"
          sx={{
            '> *:not(:first-of-type)': {
              marginLeft: -1
            },
            mb: '1x',
          }}
        >
          {['MenuButton', 'Tag'].map(value => (
            <Button
              key={value}
              selected={value === toggler}
              onClick={changeTogglerBy(value)}
              minWidth="15x"
            >
              {value}
            </Button>
          ))}
        </ButtonGroup>
      </FormGroup>
      <Divider my="4x" />
      <Dropdown
        offset={offset}
        onSelect={handleSelect}
        options={options}
        renderContent={({ options, renderOptions }) => (
          <Scrollbar
            maxHeight={200}
            overflowY="auto"
          >
            {renderOptions(options)}
          </Scrollbar>
        )}
        width={width}
      >
        {({ getToggleProps }) => {
          // Note: When using the default `MenuButton` toggle, you don't need to provide a custom render function.
          // The default layout looks like this:
          //
          // ```js
          // <Dropdown
          //   onSelect={onSelect}
          //   options={options}
          //   renderContent={renderContent}
          //   renderOption={renderOption} // not required if each option provides a label
          // >
          //   {renderValue(value)}
          // </Dropdown>
          // ```

          if (toggler === 'MenuButton') {
            return (
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
                {renderValue(value)}
              </MenuButton>
            );
          }

          if (toggler === 'Tag') {
            return (
              <Box
                {...getToggleProps()}
                sx={{
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                <Tag
                  isClosable={true}
                  onClose={(event) => {
                    event.preventDefault();
                  }}
                  sx={{
                    maxWidth: '100%',
                    '> :first-of-type': {
                      // Override flex item's default `minWidth: auto` to allow text truncation
                      minWidth: 0,
                    },
                  }}
                >
                  {renderValue(value)}
                </Tag>
              </Box>
            );
          }
        }}
      </Dropdown>
    </>
  );
};

export default App;
