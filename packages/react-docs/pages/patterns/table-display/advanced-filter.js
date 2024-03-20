import { Button, Flex, Menu, MenuToggle, MenuItem, MenuList, SearchInput, Text } from '@tonic-ui/react';
import { FilterDeleteIcon, FilterIcon } from '@tonic-ui/react-icons';
import React, { Fragment, useCallback, useMemo, useState } from 'react';
import FilterButton from './components/FilterButton';
import DropdownFilterTag from './components/DropdownFilterTag';
import MultiselectFilterTag from './components/MultiselectFilterTag';
import InputFilterTag from './components/InputFilterTag';

const App = () => {
  const [searchInputValue, setSearchInputValue] = useState('');
  const allFilters = useMemo(() => [
    {
      id: 'deviceType',
      name: 'Device type',
      render: (props) => (
        <DropdownFilterTag
          {...props}
          label={'Device type:'}
          options={[
            { value: 'desktop', label: 'Desktop' },
            { value: 'server', label: 'Server' },
          ]}
        />
      ),
    },
    {
      id: 'displayName',
      name: 'Display name',
      render: (props) => (
        <InputFilterTag
          {...props}
          label={'Display name:'}
          inputProps={{
            placeholder: 'Specify display name',
            maxLength: 256,
          }}
        />
      ),
    },
    {
      id: 'osType',
      name: 'OS type',
      render: (props) => (
        <MultiselectFilterTag
          {...props}
          label={'OS type:'}
          options={[
            { value: 'windows', label: 'Windows' },
            { value: 'macos', label: 'macOS' },
            { value: 'linux', label: 'Linux' },
          ]}
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
