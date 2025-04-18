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
  useColorStyle,
  useTheme,
} from '@tonic-ui/react';
import {
  useConst,
} from '@tonic-ui/react-hooks';
import Chance from 'chance';
import { ensureArray } from 'ensure-type';
import React, { useMemo, useState } from 'react';
import Highlight from 'react-highlight-words';
import FormGroup from '@/components/FormGroup';
import MutedText from '@/components/MutedText';
import SearchDropdown from '@/components/SearchDropdown';

const chance = new Chance();

const useSelection = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  const changeBy = (value) => () => setValue(value);
  return [value, changeBy];
};

const AutoWidthText = ({ children, tooltip, variant, ...rest }) => {
  const TextComponent = (variant === 'muted') ? MutedText : Text;

  return (
    <OverflowTooltip
      PopperProps={{
        usePortal: true,
      }}
      label={tooltip ?? children}
      maxWidth={320}
    >
      {({ ref, style }) => (
        <TextComponent
          ref={ref}
          {...style}
          flex="auto"
          {...rest}
        >
          {children}
        </TextComponent>
      )}
    </OverflowTooltip>
  );
};

const FixedWidthText = ({ children, tooltip, variant, ...rest }) => {
  const TextComponent = (variant === 'muted') ? MutedText : Text;

  return (
    <OverflowTooltip
      PopperProps={{
        usePortal: true,
      }}
      label={tooltip ?? children}
      maxWidth={320}
    >
      {({ ref, style }) => (
        <TextComponent
          ref={ref}
          {...style}
          maxWidth="100%"
          flex="none"
          {...rest}
        >
          {children}
        </TextComponent>
      )}
    </OverflowTooltip>
  );
};

const App = () => {
  const theme = useTheme();
  const [colorStyle] = useColorStyle();
  const [toggler, changeTogglerBy] = useSelection('MenuButton');
  const togglerOffset = (toggler === 'Tag') ? [0, 4] : undefined;

  const options = useConst(() => {
    return [
      { value: 'all', label: 'All' },
      ...chance.unique(chance.company, 20).map((value, index) => {
        return {
          value: `${index}_${value.toLowerCase()}`,
          label: value,
        };
      }),
    ];
  });
  const optionValueToLabelMap = useMemo(() => {
    return Object.fromEntries(options.map(option => [option.value, option.label]));
  }, [options]);

  const [value, setValue] = useState(options[0]?.value);

  const handleSelect = (option) => {
    if (value !== option.value) {
      setValue(option.value);
    }
  };

  const renderValue = (value) => {
    const label = optionValueToLabelMap[value];

    return (
      <Flex alignItems="center" columnGap="1x" width="100%">
        <FixedWidthText variant="muted" tooltip={`Company: ${label}`}>
          {'Company:'}
        </FixedWidthText>
        <AutoWidthText maxWidth={120}>
          {label}
        </AutoWidthText>
      </Flex>
    );
  };

  return (
    <>
      <FormGroup>
        <Box mb="2x">
          <Flex alignItems="center" columnGap="2x">
            <TextLabel>
              Dropdown toggler:
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
        offset={togglerOffset}
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
      >
        {({ getToggleProps }) => {
          // Note: When using the default `MenuButton` toggle, you don't need to provide a custom render function.
          // The default layout looks like this:
          //
          // ```js
          // <SearchDropdown
          //   onSelect={onSelect}
          //   options={options}
          //   renderContent={renderContent}
          //   renderOption={renderOption} // for keyword highlights
          // >
          //   {renderValue(value)}
          // </SearchDropdown>
          // ```

          if (toggler === 'MenuButton') {
            return (
              <MenuButton
                {...getToggleProps()}
                variant="secondary"
                sx={{
                  maxWidth: '100%',
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
              <Tag
                {...getToggleProps()}
                isClosable={true}
                onClose={(event) => {
                  event.preventDefault();
                }}
                sx={{
                  cursor: 'pointer',
                  maxWidth: '100%',
                  '> :first-of-type': {
                    // Override flex item's default `minWidth: auto` to allow text truncation
                    minWidth: 0,
                  },
                }}
              >
                {renderValue(value)}
              </Tag>
            );
          }
        }}
      </SearchDropdown>
    </>
  );
};

export default App;
