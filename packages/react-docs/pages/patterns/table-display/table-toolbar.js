import {
  Button,
  Divider,
  Flex,
  SearchInput,
  Scrollbar,
  Text,
  TextLabel,
  Tooltip,
  useColorStyle,
} from '@tonic-ui/react';
import { CloseSIcon, ExportIcon, RefreshIcon } from '@tonic-ui/react-icons';
import { useCallback, useState } from 'react';
import Toolbar from '@/components/Toolbar';
import ToolbarItem from '@/components/ToolbarItem';
import { Dropdown } from '@/experiments/dropdown';
import { FlexItem } from '@/experiments/flex-item';
import { MutedText } from '@/experiments/muted-text';

const filterMap = (() => {
  const filterData = [
    { value: 'all', label: 'All' },
    ...Array.from({ length: 10 }, (_, i) => ({
      value: String(i + 1),
      label: `Item ${i + 1}`,
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

const defaultDropdownItems = [
  ...Array.from(filterMap.values()),
];

const App = () => {
  const [colorStyle] = useColorStyle();
  const [selectedItem, setSelectedItem] = useState(defaultDropdownItems[0]);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [matchedResults] = useState(0);

  const clearFilters = useCallback(() => {
    setSelectedItem(defaultDropdownItems[0]);
    setSearchInputValue('');
  }, []);

  const renderSelectedItem = (item) => {
    const tooltip = `Label: ${item.label}`;
    return (
      <Flex alignItems="center" columnGap="1x" width="100%">
        <FlexItem as={MutedText} fixed tooltip={tooltip}>
          Label:
        </FlexItem>
        <FlexItem tooltip>
          {item.label}
        </FlexItem>
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
          onSelect={(item) => {
            setSelectedItem(item);
          }}
          items={defaultDropdownItems}
          renderContent={({ items, renderItems }) => {
            return (
              <Scrollbar maxHeight={200} overflowY="visible">
                {renderItems(items)}
              </Scrollbar>
            );
          }}
          width={200}
        >
          {renderSelectedItem(selectedItem)}
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
