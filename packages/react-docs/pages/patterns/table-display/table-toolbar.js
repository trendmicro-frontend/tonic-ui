import {
  Button,
  Divider,
  Flex,
  MenuButton,
  OverflowTooltip,
  SearchInput,
  Text,
  TextLabel,
  Tooltip,
  useColorStyle,
} from '@tonic-ui/react';
import { CloseSIcon, ExportIcon, RefreshIcon } from '@tonic-ui/react-icons';
import React, { useCallback, useState } from 'react';
import Dropdown from '@/components/Dropdown';
import Multiselect from '@/components/Multiselect';
import Toolbar from '@/components/Toolbar';
import ToolbarItem from '@/components/ToolbarItem';

const filterMap = (() => {
  const filterData = [
    { id: 'all', label: 'All' },
    ...Array.from({ length: 10 }, (_, i) => ({
      id: String(i + 1),
      label: `Option ${i + 1}`,
    })),
  ];

  const map = new Map();
  filterData.forEach((filter) => {
    // Use the policy ID as the key and ensure it's a string rather than a number
    const key = String(filter.id);
    map.set(key, filter);
  });
  return map;
})();

const filterItems = [...filterMap.keys()];

const dropdownOptions = [
  ...filterItems.slice(0, 4),
];

const multiselectItems = [
  ...filterItems.slice(1),
];

const renderDropdownOption = (value) => {
  const filter = filterMap.get(value);
  return filter?.label;
};

const renderDropdownLabel = (value) => {
  const selectionText = renderDropdownOption(value);
  return (
    <>
      <TextLabel mr="2x">
        {'Label:'}
      </TextLabel>
      <OverflowTooltip label={selectionText}>
        {selectionText}
      </OverflowTooltip>
    </>
  );
};

const renderMultiselectOption = (value) => {
  const filter = filterMap.get(value);
  return filter?.label;
};

const renderMultiselectLabel = (value) => {
  const selectionCount = value.length;
  const isNoneSelected = selectionCount === 0;
  const isAllSelected = selectionCount === multiselectItems.length;

  if (isNoneSelected) {
    const selectionText = 'Select';
    return (
      <>
        <TextLabel mr="2x">
          {'Label:'}
        </TextLabel>
        <OverflowTooltip label={selectionText}>
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
          {'Label:'}
        </TextLabel>
        <OverflowTooltip label={selectionText}>
          {selectionText}
        </OverflowTooltip>
      </>
    );
  }

  const selectionText = value.map(renderMultiselectOption).join(', ');
  return (
    <>
      <TextLabel mr="2x">
        {'Label:'}
      </TextLabel>
      <OverflowTooltip label={selectionText}>
        {selectionText}
      </OverflowTooltip>
      <Text ml="1x">
        {`(${selectionCount})`}
      </Text>
    </>
  );
};

const App = () => {
  const [colorStyle] = useColorStyle();
  const [dropdownValue, setDropdownValue] = useState(dropdownOptions[0]);
  const [multiselectValue, setMultiselectValue] = useState(multiselectItems);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [matchedResults] = useState(0);

  const clearFilters = useCallback(() => {
    setDropdownValue(dropdownOptions[0]);
    setMultiselectValue(multiselectItems);
    setSearchInputValue('');
  }, []);

  const menuButtonWidth = 200;
  const maxMenuButtonWidth = typeof menuButtonWidth === 'number'
    ? `calc(${menuButtonWidth}px - 48px)`
    : `calc(${menuButtonWidth} - 48px)`;

  return (
    <Toolbar>
      <ToolbarItem flexWrap="wrap">
        <Button variant="primary">
          Primary Action
        </Button>
        <Divider orientation="vertical" />
        <Dropdown
          value={dropdownValue}
          onChange={setDropdownValue}
          options={dropdownOptions}
          renderOption={renderDropdownOption}
        >
          <MenuButton
            variant="secondary"
            width={menuButtonWidth}
          >
            <Flex maxWidth={maxMenuButtonWidth}>
              {renderDropdownLabel(dropdownValue)}
            </Flex>
          </MenuButton>
        </Dropdown>
        <Multiselect
          isSearchable={true}
          value={multiselectValue}
          onChange={setMultiselectValue}
          options={multiselectItems}
          renderOption={renderMultiselectOption}
        >
          <MenuButton
            variant="secondary"
            width={menuButtonWidth}
          >
            <Flex maxWidth={maxMenuButtonWidth}>
              {renderMultiselectLabel(multiselectValue)}
            </Flex>
          </MenuButton>
        </Multiselect>
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
