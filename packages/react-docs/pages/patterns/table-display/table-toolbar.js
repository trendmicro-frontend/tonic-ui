import {
  Button,
  Divider,
  Flex,
  OverflowTooltip,
  SearchInput,
  Scrollbar,
  Text,
  TextLabel,
  Tooltip,
  useColorStyle,
} from '@tonic-ui/react';
import { CloseSIcon, ExportIcon, RefreshIcon } from '@tonic-ui/react-icons';
import React, { useCallback, useState } from 'react';
import Toolbar from '@/components/Toolbar';
import ToolbarItem from '@/components/ToolbarItem';
import { Dropdown } from '@/experiments/dropdown';
import { MutedText } from '@/experiments/muted-text';

const filterMap = (() => {
  const filterData = [
    { value: 'all', label: 'All' },
    ...Array.from({ length: 10 }, (_, i) => ({
      value: String(i + 1),
      label: `Option ${i + 1}`,
    })),
  ];

  const map = new Map();
  filterData.forEach((filter) => {
    // Use the policy ID as the key and ensure it's a string rather than a number
    const key = String(filter.value);
    map.set(key, filter);
  });
  return map;
})();

const defaultDropdownOptions = [
  ...Array.from(filterMap.values()),
];

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
  const [colorStyle] = useColorStyle();
  const [selectedOption, setSelectedOption] = useState(defaultDropdownOptions[0]);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [matchedResults] = useState(0);

  const clearFilters = useCallback(() => {
    setSelectedOption(defaultDropdownOptions[0]);
    setSearchInputValue('');
  }, []);

  const renderSelectedOption = (option) => {
    return (
      <Flex alignItems="center" columnGap="1x" width="100%">
        <FixedWidthText variant="muted" tooltip={`Label: ${option.label}`}>
          {'Label:'}
        </FixedWidthText>
        <AutoWidthText tooltip={option.label}>
          {option.label}
        </AutoWidthText>
      </Flex>
    );
  };

  return (
    <Toolbar>
      <ToolbarItem flexWrap="wrap">
        <Button variant="primary">
          Primary Action
        </Button>
        <Divider orientation="vertical" height="8x" />
        <Dropdown
          onSelect={(option) => {
            setSelectedOption(option);
          }}
          options={defaultDropdownOptions}
          renderContent={({ options, renderOptions }) => {
            return (
              <Scrollbar maxHeight={200} overflowY="visible">
                {renderOptions(options)}
              </Scrollbar>
            );
          }}
          width={200}
        >
          {renderSelectedOption(selectedOption)}
        </Dropdown>
        <SearchInput
          placeholder="Search"
          onChange={(event) => {
            const { value } = event.target;
            setSearchInputValue(value);
          }}
          onClearInput={() => {
            setSearchInputValue('');
          }}
          value={searchInputValue}
        />
        <Button
          variant="ghost"
          onClick={() => clearFilters()}
          sx={{
            color: colorStyle.color.info,
            _focus: {
              color: colorStyle.color.info,
            },
            columnGap: '1x',
            mr: '3x',
          }}
        >
          <CloseSIcon /> <Text>Clear</Text>
        </Button>
        <Flex columnGap="1x">
          <TextLabel>
            Matched results:
          </TextLabel>
          {matchedResults}
        </Flex>
      </ToolbarItem>
      <ToolbarItem flexWrap="nowrap">
        <Tooltip label="Export">
          <Button variant="ghost">
            <ExportIcon />
          </Button>
        </Tooltip>
        <Tooltip label="Refresh">
          <Button variant="ghost">
            <RefreshIcon />
          </Button>
        </Tooltip>
      </ToolbarItem>
    </Toolbar>
  );
};

export default App;
