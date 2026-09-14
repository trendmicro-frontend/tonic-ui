import { Button, Flex, Menu, MenuToggle, MenuItem, MenuList, SearchInput, Text } from '@tonic-ui/react';
import { FilterDeleteIcon, FilterIcon } from '@tonic-ui/react-icons';
import { Fragment, useCallback, useMemo, useState } from 'react';
import FilterButton from './components/FilterButton';
import DropdownFilterTag from './components/DropdownFilterTag';
import SearchDropdownFilterTag from './components/SearchDropdownFilterTag';
import InputFilterTag from './components/InputFilterTag';
import { FlexItem } from '@/experiments/flex-item';
import { MutedText } from '@/experiments/muted-text';

const App = () => {
  const [searchInputValue, setSearchInputValue] = useState('');
  const allFilters = useMemo(() => [
    {
      id: 'deviceType',
      name: 'Device type',
      render: (props) => (
        <DropdownFilterTag
          {...props}
          items={[
            { value: 'desktop', label: 'Desktop' },
            { value: 'server', label: 'Server' },
          ]}
          renderLabel={({ item }) => (
            <Flex alignItems="center" columnGap="1x">
              <FlexItem as={MutedText} fixed>
                Device type:
              </FlexItem>
              <FlexItem tooltip>
                {item?.label}
              </FlexItem>
            </Flex>
          )}
        />
      ),
    },
    {
      id: 'displayName',
      name: 'Display name',
      render: (props) => (
        <InputFilterTag
          {...props}
          inputProps={{
            placeholder: 'Specify display name',
            maxLength: 256,
          }}
          renderLabel={({ value }) => (
            <Flex alignItems="center"columnGap="1x">
              <Text color="text.secondary">
                Display name:
              </Text>
              <Text>{value}</Text>
            </Flex>
          )}
        />
      ),
    },
    {
      id: 'osType',
      name: 'OS type',
      render: (props) => (
        <SearchDropdownFilterTag
          {...props}
          items={[
            { value: 'windows', label: 'Windows' },
            { value: 'macos', label: 'macOS' },
            { value: 'linux', label: 'Linux' },
          ]}
          renderLabel={({ selectedItems, isNoneSelected, isAllSelected }) => {
            const selectionText = selectedItems.map(item => item.label).join(', ');
            const valueText = isNoneSelected
              ? 'Select'
              : (isAllSelected ? 'All' : selectionText);
            const tooltip = `OS type: ${valueText}`;
            return (
              <Flex alignItems="center" columnGap="1x">
                <FlexItem as={MutedText} fixed tooltip={tooltip}>
                  OS type:
                </FlexItem>
                <FlexItem tooltip={tooltip}>
                  {valueText}
                </FlexItem>
                {!isNoneSelected && !isAllSelected && (
                  <FlexItem fixed>
                    {`(${selectedItems.length})`}
                  </FlexItem>
                )}
              </Flex>
            );
          }}
        />
      ),
    },
  ], []);

  const [selectedFilters, setSelectedFilters] = useState([]);
  const unselectedFilters = useMemo(() => {
    const selectedFilterIds = selectedFilters.map(({ id }) => id);
    return allFilters.filter((filter) => !selectedFilterIds.includes(filter.id));
  }, [allFilters, selectedFilters]);

  const clearSelectedFilters = useCallback(() => {
    setSelectedFilters([]);
  }, []);

  return (
    <Flex
      flexWrap="wrap"
      alignItems="center"
      columnGap="2x"
      rowGap="3x"
    >
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
      <Menu
        returnFocusOnClose={false}
      >
        <MenuToggle
          disabled={unselectedFilters.length === 0}
        >
          {({ getMenuToggleProps }) => (
            <Button
              {...getMenuToggleProps()}
              variant="secondary"
              width="8x"
              height="8x"
            >
              <FilterIcon />
            </Button>
          )}
        </MenuToggle>
        <MenuList width="max-content">
          {unselectedFilters.map((filter) => (
            <MenuItem
              key={filter.id}
              onClick={() => {
                setSelectedFilters((prevSelectedFilters) => {
                  return [...prevSelectedFilters, filter];
                });
              }}
            >
              {filter.name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      {selectedFilters.map((filter) => {
        return (
          <Fragment key={filter.id}>
            {filter.render({
              value: filter.value,
              onChange: (value) => {
                setSelectedFilters((prevSelectedFilters) => {
                  return prevSelectedFilters.map(prevSelectedFilter => {
                    if (prevSelectedFilter.id !== filter.id) {
                      return prevSelectedFilter;
                    }
                    return {
                      ...prevSelectedFilter,
                      value: value,
                    };
                  });
                });
              },
              onClose: () => {
                setSelectedFilters((prevSelectedFilters) => {
                  return prevSelectedFilters.filter(
                    (prevSelectedFilter) => prevSelectedFilter.id !== filter.id
                  );
                });
              },
            })}
          </Fragment>
        );
      })}
      {(selectedFilters.length > 0) && (
        <FilterButton
          columnGap="1x"
          onClick={() => clearSelectedFilters()}
        >
          <FilterDeleteIcon /> <Text>Clear</Text>
        </FilterButton>
      )}
    </Flex>
  );
};

export default App;
