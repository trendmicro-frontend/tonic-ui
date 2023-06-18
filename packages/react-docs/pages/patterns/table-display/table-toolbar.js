import {
  Button,
  Divider,
  Flex,
  Icon,
  LinkButton,
  OverflowTooltip,
  SearchInput,
  Text,
  TextLabel,
  Tooltip,
} from '@tonic-ui/react';
import React, { useCallback, useState } from 'react';
import Dropdown from '@/components/Dropdown';
import Multiselect from '@/components/Multiselect';

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

const dropdownItems = [
  ...filterItems.slice(0, 4),
];

const multiselectItems = [
  ...filterItems.slice(1),
];

const renderDropdownItem = (value) => {
  const filter = filterMap.get(value);
  return filter?.label;
};

const renderDropdownLabel = (value) => {
  const selectionText = renderDropdownItem(value);
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

const renderMultiselectItem = (value) => {
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

  const selectionText = value.map(renderMultiselectItem).join(', ');
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
  const [dropdownValue, setDropdownValue] = useState(dropdownItems[0]);
  const [multiselectValue, setMultiselectValue] = useState(multiselectItems);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [matchedResults] = useState(0);

  const reset = useCallback(() => {
    setDropdownValue(dropdownItems[0]);
    setMultiselectValue(multiselectItems);
    setSearchInputValue('');
  }, []);

  return (
    <Flex
      alignItems="flex-start"
      justifyContent="space-between"
      columnGap="10x"
    >
      <Flex
        flexWrap="wrap"
        alignItems="center"
        columnGap="2x"
        rowGap="3x"
      >
        <Button variant="primary">
          Primary Action
        </Button>
        <Divider orientation="vertical" />
        <Dropdown
          value={dropdownValue}
          onChange={setDropdownValue}
          items={dropdownItems}
          renderItem={renderDropdownItem}
          renderLabel={renderDropdownLabel}
        />
        <Multiselect
          isSearchable={true}
          value={multiselectValue}
          onChange={setMultiselectValue}
          items={multiselectItems}
          renderItem={renderMultiselectItem}
          renderLabel={renderMultiselectLabel}
          width={240}
        />
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
        <LinkButton
          columnGap="1x"
          mr="3x"
          onClick={() => reset()}
        >
          <Icon icon="close-s" /> <Text>Reset</Text>
        </LinkButton>
        <Flex columnGap="1x">
          <TextLabel>
            Matched results:
          </TextLabel>
          {matchedResults}
        </Flex>
      </Flex>
      <Flex
        flexWrap="nowrap"
        alignItems="center"
        columnGap="2x"
        rowGap="3x"
      >
        <Tooltip label="Export">
          <Button variant="ghost">
            <Icon icon="export" />
          </Button>
        </Tooltip>
        <Tooltip label="Refresh">
          <Button variant="ghost">
            <Icon icon="refresh" />
          </Button>
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default App;
