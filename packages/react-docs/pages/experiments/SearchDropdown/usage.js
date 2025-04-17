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
  useColorStyle,
  useTheme,
} from '@tonic-ui/react';
import {
  InfoOIcon,
} from '@tonic-ui/react-icons';
import Chance from 'chance';
import { ensureArray } from 'ensure-type';
import React, { useState } from 'react';
import Highlight from 'react-highlight-words';
import FormGroup from '@/components/FormGroup';
import MutedText from '@/components/MutedText';
import SearchDropdown from '@/components/SearchDropdown';

const chance = new Chance();

const options = Array.from({ length: 20 }, () => {
  const label = chance.company();
  return {
    value: label.toLowerCase().replace(/\s+/g, '-'),
    label,
  };
});

options.unshift({ value: 'all', label: 'All' });

const useSelection = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  const changeBy = (value) => () => setValue(value);
  return [value, changeBy];
};

const App = () => {
  const theme = useTheme();
  const [colorStyle] = useColorStyle();
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
    const fieldText = 'Company:';
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
      <SearchDropdown
        offset={offset}
        onSelect={handleSelect}
        options={options}
        renderContent={({ options, renderOptions, renderSearchInput }) => (
          <>
            <Box px="3x" mb="2x">
              {renderSearchInput()}
            </Box>
            <Scrollbar
              maxHeight={200}
              overflowY="visible"
            >
              {renderOptions(options)}
            </Scrollbar>
          </>
        )}
        renderOption={(option, { searchKeyword }) => {
          const searchWords = ensureArray(searchKeyword);
          const textToHighlight = option.label;
          const highlightStyle = {
            backgroundColor: theme?.colors?.[colorStyle?.text?.highlight],
              color: theme?.colors?.['gray:100'],
          };

          return (
            <Highlight
              searchWords={searchWords}
              textToHighlight={textToHighlight}
              highlightStyle={highlightStyle}
            />
          );
        }}
        width={width}
      >
        {({ getToggleProps }) => {
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
      </SearchDropdown>
    </>
  );
};

export default App;
